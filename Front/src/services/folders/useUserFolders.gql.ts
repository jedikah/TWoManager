import gql from 'graphql-tag';

import { FoldersResult } from '../types';

export interface UserFoldersData {
  userFolders: FoldersResult;
}

export const USER_FOLDERS = gql`
  query ($filter: FoldersFilterInput!, $pagination: PaginationInput!) {
    userFolders(filter: $filter, pagination: $pagination) {
      folders {
        id
        client {
          id
          name
        }
        dateTrav
        facture {
          id
        }
        typeTrav {
          id
          label
          model {
            id
            name
          }
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
