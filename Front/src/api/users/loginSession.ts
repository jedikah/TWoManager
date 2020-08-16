import gql from 'graphql-tag';

export type LogInSessionData = boolean;

export const LOGINSESSION = gql`
  mutation LoginSession($input: LoginInput!) {
    loginSession(input: $input)
  }
`;
