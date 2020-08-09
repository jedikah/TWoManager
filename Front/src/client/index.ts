import { ApolloClient, DefaultOptions } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { BatchHttpLink } from 'apollo-link-batch-http';

const token = localStorage.getItem('token') || null;

const httpOptions = {
  uri: 'http://localhost:3000/graphql',
  headers: {
    authorization: `Bearer ${token}`
  }
};

const httpUploadOptions = {
  uri: 'http://localhost:3000/graphql'
  // credentials: 'include',
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Credentials': true
  // },
  // fetchOptions: {
  //   mode: 'no-cors'
  // }
};

const defaultOptions: DefaultOptions = {
  watchQuery: {},
  query: {
    errorPolicy: 'all'
  }
};

const httpLink = ApolloLink.split(
  operation => operation.getContext().hasUpload,
  createUploadLink(httpUploadOptions),
  new BatchHttpLink(httpOptions)
);

// Create the apollo client
const apolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
  defaultOptions
});

export default apolloClient;
