import gql from 'graphql-tag';
import { LogInOutput } from '../types';

export interface LogInData {
  login: LogInOutput;
}

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      type
    }
  }
`;
