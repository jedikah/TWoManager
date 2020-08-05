import graphqlClient from '../index';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql/error/GraphQLError';
import { Notify } from 'quasar';

const context = () => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

const notifyThis = (message: string, type = 'warning') => {
  Notify.create({
    type: type,
    message,
    position: 'bottom-right',
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

const notifyThere = (errors: readonly GraphQLError[], type = 'warning') => {
  let i = 0;
  errors.map(err => {
    const time = parseInt(i++ + '000', 10);
    setTimeout(() => {
      notifyThis(err.message, type);
    }, time);
  });
};

const Queries = {
  checkToken: async (token?: string) => {
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
  },
  login: async (login: string, password: string) => {
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
  },

  loginSession: async (login: string, password: string) => {
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

  usersCount: async () => {
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
  }
};

export default Queries;
