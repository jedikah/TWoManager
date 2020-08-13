import gql from 'graphql-tag';

export const PDPUPLOAD = gql`
  mutation UploadFile($login: String!, $file: Upload!) {
    uploadFile(login: $login, file: $file)
  }
`;
