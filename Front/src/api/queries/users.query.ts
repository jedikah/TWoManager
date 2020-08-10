import graphqlClient from '../index';
import gql from 'graphql-tag';

import { context, notifyThere, notifyThis } from '../context';

// const Queries = {
export const checkToken = async (token?: string) => {
  if (!token) token = localStorage.getItem('token') || null;

  const message = 'Veuillez vous connecter pour ouvrir une nouvelle session.';

  let response = null;
  if (token)
    try {
      response = await graphqlClient.query({
        query: gql`
          query CheckToken($input: String!) {
            checkToken(input: $input) {
              userId
              userName
              login
              photo
              type
              status
              iat
              exp
            }
          }
        `,
        variables: {
          input: token
        },
        fetchPolicy: 'network-only'
      });

      if (response.errors) {
        notifyThere(response.errors);
        return null;
      }

      return response.data.checkToken;
    } catch (err) {
      console.log('users query, checkToken: ', err);
    }
  else notifyThis(message, 'info');
};

export const login = async (login: string, password: string) => {
  try {
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
      },
      errorPolicy: 'all'
    });

    if (response.errors) {
      notifyThere(response.errors);
      return null;
    }

    return response.data.login;
  } catch (err) {
    console.log({ errMezs: err.message });
  }
};

export const loginSession = async (login: string, password: string) => {
  console.log({ login, password });
  try {
    const response = await graphqlClient.query({
      query: gql`
        query($input: LoginInput!) {
          loginSession(input: $input)
        }
      `,
      variables: {
        input: {
          login,
          password
        }
      },
      fetchPolicy: 'network-only',
      context: context()
    });

    if (response.errors) {
      notifyThere(response.errors);
      return null;
    }

    return response.data.loginSession;
  } catch (err) {
    console.log({ errMezs: err.message });
  }
};

export const getUsers = async () => {
  const response = await graphqlClient.query({
    query: gql`
      query Users {
        users {
          userId
          login
          userName
        }
      }
    `,
    errorPolicy: 'all'
  });

  return response.data.users;
};

export const usersCount = async () => {
  const response = await graphqlClient.query({
    query: gql`
      query UsersCount {
        usersCount
      }
    `,
    errorPolicy: 'all'
  });

  if (response.errors) notifyThere(response.errors);

  return response.data.usersCount;
};
