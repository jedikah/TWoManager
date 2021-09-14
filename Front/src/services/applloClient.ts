import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const authLink = setContext((_, { headers, ...context }) => {
  let token = '';
  token = localStorage.getItem('token'); // survive a refresh
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
    ...context,
  };
});

const defaultOptions: DefaultOptions = {
  watchQuery: {},
  query: {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first',
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    },
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/subscriptions',
  options: {
    reconnect: false,
  },
});

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql',
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions,
});
