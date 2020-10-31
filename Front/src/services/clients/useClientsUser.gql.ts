import gql from 'graphql-tag';
import { ClientsCollaborateResult } from '../types';

interface Client {
  clientId: string;
  clientName: string;
  domicile: string;
  contact: string;
}

export interface UserClient {
  __typename?: string;
  hasMore: boolean;
  cursor: number;
  clients: Client[];
}

export interface UserClientData {
  userClients: ClientsCollaborateResult;
}

export const CLIENTSUSER = gql`
  query($paginationInput: PaginationInput!) {
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
