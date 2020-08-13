import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation Register($input: UserInput!) {
    register(input: $input) {
      userId
      userName
      login
      photo
      type
      status
    }
  }
`;
