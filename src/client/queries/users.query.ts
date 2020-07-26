import graphqlClient from '../index';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql/error/GraphQLError';

const notifyThis = (
  notify: Function,
  message: string,
  type = 'warning',
  position = 'bottom-right'
) => {
  notify({
    type: type,
    message,
    position,
    timeout: 6000,
    multiLine: true,
    progress: true,
    actions: [
      {
        label: 'Compris',
        color: 'white',
        handler: () => {
          /* ... */
        }
      }
    ]
  });
};

const notifyThere = (
  notify: Function,
  errors: readonly GraphQLError[],
  type = 'warning',
  position = 'bottom-right'
) => {
  let i = 0;
  errors.map(err => {
    const time = parseInt(i++ + '000', 10);
    setTimeout(() => {
      notifyThis(notify, err.message, type, position);
    }, time);
  });
};

const Queries = {
  login: async (login: string, password: string, notify?: Function) => {
    // try {
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

    if (response.errors && notify) notifyThere(notify, response.errors);

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
      `,
      errorPolicy: 'all'
    });

    return response.data.users;
  },

  usersCount: async (notify: Function) => {
    const response = await graphqlClient.query({
      query: gql`
        query UsersCount {
          usersCount
        }
      `,
      errorPolicy: 'all'
    });

    if (response.errors && notify) notifyThere(notify, response.errors);

    return response.data.usersCount;
  },

  checkToken: async (notify: Function, token?: string) => {
    if (!token) token = localStorage.getItem('token');
    const message =
      'Votre dernière session à éxpiré, veuillez vous reconnecter.';

    if (token) {
      const response = await graphqlClient.query({
        query: gql`
          query($input: String!) {
            checkToken(input: $input) {
              userId
              userName
              login
              type
              status
              iat
              exp
            }
          }
        `,
        variables: { input: token },
        errorPolicy: 'all'
      });
      if (response.errors && notify) notifyThere(notify, response.errors);

      return response.data.checkToken;
    } else notifyThis(notify, message, 'info');
  }
};

export default Queries;
