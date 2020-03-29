import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';

import {
  Loading,
  TextFailure,
  Owner,
  IssueList,
  FilterIssue,
  AreaPagination,
} from './styles';

import Container from '../../components/Container';
import CircleButton from '../../components/CircleButton';

import api from '../../services/api';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    loading: true,
    repository: null,
    issues: null,
    typeIssues: 'open',
    options: [
      { value: 'all', label: 'All' },
      { value: 'open', label: 'Open' },
      { value: 'closed', label: 'Closed' },
    ],
    page: 1,
    maxPage: null,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    try {
      const [repository, issues] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            page: 1,
            per_page: 5,
          },
        }),
      ]);

      if (issues.data.length < 5) {
        this.setState({ maxPage: 1 });
      }

      this.setState({
        repository: repository.data,
        issues: issues.data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        repository: null,
        issues: null,
        loading: false,
      });
    }
  }

  handleSelectChange = async event => {
    const typeIssues = event.target.value;

    if (
      typeIssues !== 'all' &&
      typeIssues !== 'open' &&
      typeIssues !== 'closed'
    ) {
      return;
    }

    this.setState({ typeIssues });

    const {
      repository: { full_name: repoName },
    } = this.state;

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: typeIssues,
        per_page: 5,
        page: 1,
      },
    });

    if (issues.data.length < 5) {
      this.setState({ maxPage: 1 });
    }

    this.setState({ issues: issues.data, page: 1, maxPage: null });
  };

  previousPage = async () => {
    const {
      page,
      repository: { full_name: repoName },
      typeIssues,
    } = this.state;

    if (page < 2) {
      this.setState({ page: 1 });
      return;
    }

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: typeIssues,
        per_page: 5,
        page: page - 1 < 1 ? 1 : page - 1,
      },
    });

    this.setState({ issues: issues.data, page: page - 1 });
  };

  nextPage = async () => {
    const {
      page,
      repository: { full_name: repoName },
      typeIssues,
    } = this.state;

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: typeIssues,
        per_page: 5,
        page: page < 1 ? 1 : page + 1,
      },
    });

    if (issues.data.length === 0) {
      this.setState({ maxPage: page });
    } else {
      this.setState({ issues: issues.data, page: page + 1 });
    }
  };

  render() {
    const {
      repository,
      issues,
      loading,
      page,
      maxPage,
      typeIssues,
      options,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    if (!repository) {
      return (
        <Container>
          <TextFailure>
            <Link to="/">Voltar</Link>
            Não foi possível encontrar o repositório ou suas issues.
          </TextFailure>
        </Container>
      );
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <FilterIssue>
          <h3>Issues</h3>
          <select onChange={this.handleSelectChange} value={typeIssues}>
            {options.map(option => (
              <option
                key={option.value}
                value={option.value}
                selected={option.value === typeIssues}
              >
                {option.label}
              </option>
            ))}
          </select>
        </FilterIssue>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <AreaPagination>
          <CircleButton
            type="button"
            action={this.previousPage}
            disabled={page === 1}
          >
            {page === 1 ? (
              <FaPlus color="#fff" size={14} />
            ) : (
              <FaArrowLeft color="#fff" size={14} />
            )}
          </CircleButton>
          <CircleButton
            type="button"
            action={this.nextPage}
            disabled={page === maxPage}
          >
            {page === maxPage ? (
              <FaPlus color="#fff" size={14} />
            ) : (
              <FaArrowRight color="#fff" size={14} />
            )}
          </CircleButton>
        </AreaPagination>
      </Container>
    );
  }
}
