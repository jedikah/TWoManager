import gql from 'graphql-tag';

export const USERSCOUNT = gql`
  query UsersCount {
    usersCount
  }
`;
