import gql from 'graphql-tag';
import { FOLDER_FRAG, PAGINATION_META_FRAG } from '../fragments';
import { FoldersResult } from '../types';

export interface UserFoldersData {
  userFolders: FoldersResult;
}

export const USER_FOLDERS = gql`
  query UserFolders(
    $foldersFilterInput: FoldersFilterInput!
    $paginationInput: PaginationInput!
  ) {
    userFolders(
      foldersFilterInput: $foldersFilterInput
      paginationInput: $paginationInput
    ) {
      folders {
        ...FolderFrag
      }
      paginationMeta {
        ...PaginationMetaFrag
      }
    }
  }
  ${FOLDER_FRAG}
  ${PAGINATION_META_FRAG}
`;
