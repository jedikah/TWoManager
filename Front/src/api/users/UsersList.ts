import gql from 'graphql-tag';

export const USERSLIST = gql`
  query Users {
    users {
      userId
      login
      userName
    }
  }
`;
