import graphqlClient from '../index';
import gql from 'graphql-tag';

const Queries = {
  login: async (login: string, password: string) => {
    const response = await graphqlClient.query({
      query: gql`
        query Login($input: LoginInput!) {
          login(input: $input) {
            token
            type
          }
        }
      `,
      variables: {
        input: {
          login,
          password
        }
      }
    });

    return response.data.login;
  },
  getUsers: async () => {
    const response = await graphqlClient.query({
      query: gql`
        query Users {
          users {
            userId
            login
            userName
          }
        }
      `
    });

    return response.data.users;
  },

  usersCount: async () => {
    const response = await graphqlClient.query({
      query: gql`
        query UsersCount {
          usersCount
        }
      `
    });

    return response.data.usersCount;
  }
};

export default Queries;
