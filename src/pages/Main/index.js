import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';

import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    inputError: false,
  };

  componentDidMount() {
    const repositories = JSON.parse(localStorage.getItem('repositories'));

    if (repositories) {
      this.setState({ repositories });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = event => {
    this.setState({ newRepo: event.target.value, inputError: false });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    try {
      if (!newRepo) {
        this.setState({ loading: false });
        throw new Error('Input vazio.');
      }

      if (repositories.find(repository => repository.name === newRepo)) {
        this.setState({ loading: false });
        throw new Error('Repositório duplicado.');
      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (error) {
      this.setState({
        inputError: true,
        loading: false,
      });
    }
  };

  render() {
    const { newRepo, loading, repositories, inputError } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} inputError={inputError}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repositories/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
