import gql from 'graphql-tag';
import { LoginInput } from '../types';

export interface LoginInputData {
  input: LoginInput;
}

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      type
    }
  }
`;
