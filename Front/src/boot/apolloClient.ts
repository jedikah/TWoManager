import { ApolloClient, DefaultOptions } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { createHttpLink } from 'apollo-link-http';

const token = localStorage.getItem('token') || null;

const httpOptions = {
  uri: 'http://localhost:3000/graphql'
};

const httpUploadOptions = {
  uri: 'http://localhost:3000/graphql'
};

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
    errorPolicy: 'all'
  }
};

// const httpLink = ApolloLink.split(
//   operation => operation.getContext().hasUpload,
//   createUploadLink(httpUploadOptions),
//   new BatchHttpLink(httpOptions),
// );

const httpLink = createUploadLink({ uri: 'http://localhost:3000/graphql' });
const link = authLink.concat(httpLink);

// Create the apollo client
export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions
});
