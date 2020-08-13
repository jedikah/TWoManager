import gql from 'graphql-tag';

export const LOGINSESSION = gql`
  query($input: LoginInput!) {
    loginSession(input: $input)
  }
`;
