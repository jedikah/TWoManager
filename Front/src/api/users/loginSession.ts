import gql from 'graphql-tag';

export interface LogInSessionData {
  loginSession: boolean;
}

export const LOGINSESSION = gql`
  mutation LoginSession($input: LoginInput!) {
    loginSession(input: $input)
  }
`;
