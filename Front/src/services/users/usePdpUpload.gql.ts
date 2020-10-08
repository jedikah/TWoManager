import gql from 'graphql-tag';

export type PdpUploadData = boolean;

export const PDPUPLOAD = gql`
  mutation UploadFile($login: String!, $file: Upload!) {
    uploadFile(login: $login, file: $file)
  }
`;
