import gql from 'graphql-tag';
export interface CheckTokenData {
  input: string;
}

export const CHECKTOKEN = gql`
  query CheckToken($input: String!) {
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
