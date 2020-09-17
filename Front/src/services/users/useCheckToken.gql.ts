import gql from 'graphql-tag';
import { CheckTokenOutput } from '../types';
export interface CheckTokenData {
  checkToken: CheckTokenOutput;
}

export const CHECKTOKEN = gql`
  mutation CheckToken($input: String!) {
    checkToken(input: $input) {
      userId
      userName
      login
      photo
      type
      status
      iat
      exp
    }
  }
`;
