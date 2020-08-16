import gql from 'graphql-tag';
import { UserOutput } from '../types';

export interface RegisterData {
  register: UserOutput;
}

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
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
