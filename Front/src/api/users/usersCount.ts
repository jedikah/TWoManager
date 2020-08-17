import gql from 'graphql-tag';

export type UsersCountData = number;

export const USERSCOUNT = gql`
  query UsersCount {
    usersCount
  }
`;
