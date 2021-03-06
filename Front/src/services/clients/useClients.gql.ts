import gql from 'graphql-tag';
import { ClientsResult } from '../types';

export interface UserClientData {
  userClients: ClientsResult;
}

export const CLIENTSUSER = gql`
  query UserClients($paginationInput: PaginationInput!) {
    userClients(paginationInput: $paginationInput) {
      clients {
        clientId
        clientName
        domicile
        contact
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
