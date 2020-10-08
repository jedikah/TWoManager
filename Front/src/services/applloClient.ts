import { ApolloClient, DefaultOptions } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { Notify } from 'quasar';
import { onError } from 'apollo-link-error';

const authLink = setContext((_, { headers, ...context }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {})
    },
    ...context
  };
});

const defaultOptions: DefaultOptions = {
  watchQuery: {},
  query: {
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  },
  mutate: {
    errorPolicy: 'all'
  }
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  let erros = '';
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      return (erros = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  if (networkError) erros = `[Network error]: ${networkError}`;
  Notify.create({
    type: 'warning',
    message: erros,
    position: 'bottom-right',
    timeout: 6000,
    multiLine: true,
    progress: true
  });
});

const httpLink = createUploadLink({ uri: 'http://localhost:4000/graphql' });

const link = authLink.concat(httpLink);

// Create the apollo client
export const apolloClient = new ApolloClient({
  // link: errorLink.concat(link),
  link,
  cache: new InMemoryCache(),
  defaultOptions
});
