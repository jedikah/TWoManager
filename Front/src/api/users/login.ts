import gql from 'graphql-tag';
import { LoginOutput } from '../types';

export interface LogInData {
  login: LoginOutput;
}

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      type
    }
  }
`;
