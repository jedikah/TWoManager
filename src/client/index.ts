import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const token = localStorage.getItem('token') || null;

// Create the apollo client
const apolloClient = new ApolloClient({
  link: createHttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:3000/graphql',
    headers: {
      authorization: `Bearer ${token}`
    }
  }),
  cache: new InMemoryCache()
});

export default apolloClient;
