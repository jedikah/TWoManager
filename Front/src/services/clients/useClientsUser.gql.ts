import gql from 'graphql-tag';
import { ClientsCollaborateResult } from '../types';

export interface UserClientData {
  userClients: ClientsCollaborateResult;
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
