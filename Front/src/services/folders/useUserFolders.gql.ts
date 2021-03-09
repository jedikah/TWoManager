import gql from 'graphql-tag';
import { FOLDER_FRAG, PAGINATION_META_FRAG } from '../fragments';
import { FoldersResult } from '../types';

export interface UserFoldersData {
  userFolders: FoldersResult;
}

export const USER_FOLDERS = gql`
query($filter: FoldersFilterInput!, $pagination: PaginationInput!){
  userFolders(filter: $filter, pagination: $pagination){
    folders {
      folderId
      client {
        clientId
        name
      }
      dateTrav
      facture {
        factureId
      }
      typeTrav {
        typeTravId
        label
      }
      fokontany
      groundName
      localisationTrav
      numTitle
      price
      register
      user {
        userId
      }
    }
     paginationMeta {
      currentPage
      itemCount
      itemsPerPage
      totalItems
      totalPages
    }
  }
}
`;
