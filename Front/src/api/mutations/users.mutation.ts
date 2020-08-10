import graphqlClient from '../index';
import gql from 'graphql-tag';

export const register = async (
  userName: string,
  login: string,
  password: string,
  photo?: string
) => {
  const response = await graphqlClient.mutate({
    mutation: gql`
      mutation Register($input: UserInput!) {
        register(input: $input) {
          userId
          userName
          login
          photo
          type
          status
        }
      }
    `,
    variables: {
      input: { userName, login, password, photo }
    }
  });
  console.log({ data: response.data });
  return response.data.register;
};

export const uploadPdp = async (file: {}, login: string) => {
  console.log({ file });
  const response = await graphqlClient.mutate({
    mutation: gql`
      mutation UploadFile($login: String!, $file: Upload!) {
        uploadFile(login: $login, file: $file)
      }
    `,
    variables: { file, login },
    context: {
      hasUpload: true
    }
  });
  return response.data.uploadFile;
};
