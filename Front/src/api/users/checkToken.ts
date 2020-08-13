import gql from 'graphql-tag';

export const CHECKtOKEN = gql`
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
