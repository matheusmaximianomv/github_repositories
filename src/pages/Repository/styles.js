import styled from 'styled-components';

import arrow from '../../assets/arrow-down.svg';

export const Loading = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 30px;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextFailure = styled.header`
  display: flex;
  flex-direction: column;

  font-weight: bold;
  font-size: 20px;
  text-align: center;

  a {
    margin-bottom: 5px;
    text-decoration: none;
    color: #7159c1;
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 25px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #667;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }

  a {
    font-size: 14px;
    text-decoration: none;
    color: #7159c1;
  }
`;

export const FilterIssue = styled.div`
  margin-top: 5px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  select {
    margin-left: 15px;
    border: 0;
    padding: 10px 15px;
    border-radius: 4px;
    background-color: #7159c1;
    color: #fff;

    /* Arrow */
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    background-image: url(${arrow});
    background-repeat: no-repeat, repeat;
    background-position: right 0.4em top 55%, 0 0;
    background-size: 0.65em auto, 100%;

    cursor: pointer;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7151c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const AreaPagination = styled.footer`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
