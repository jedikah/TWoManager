import gql from 'graphql-tag';
import { Folder } from '../types';

export interface AddFolderData {
  addFolder: Folder;
}

export const ADDFOLDER = gql`
  mutation AddFolder($input: FolderAddInput!) {
    addFolder(input: $input) {
      client {
        name
      }
      user {
        userName
      }
      register
      fokontany
      groundName
      numTitle
    }
  }
`;
