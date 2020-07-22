import graphqlClient from '../index';
import gql from 'graphql-tag';

const Mutations = {
  register: async (userName: string, login: string, password: string) => {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation Register($input: UserInput!) {
          register(input: $input) {
            userId
            userName
            login
            type
            status
          }
        }
      `,
      variables: {
        input: { userName, login, password }
      }
    });
    console.log({ data: response.data });
    return response.data.register;
  }
};

export default Mutations;
