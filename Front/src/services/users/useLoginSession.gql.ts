import gql from 'graphql-tag';

export interface LogInSessionData {
  loginSession: boolean;
}

export const LOGINSESSION = gql`
  mutation LoginSession($input: LogInInput!) {
    loginSession(input: $input)
  }
`;
