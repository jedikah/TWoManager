import gql from 'graphql-tag';
import { PaginateUserClients } from '../types';

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
  userClients: PaginateUserClients;
}

export const CLIENTSUSER = gql`
  query($after: Float!, $pageSize: Float!) {
    userClients(after: $after, pageSize: $pageSize) {
      countRow
      hasMore
      cursor
      clients {
        clientId
        clientName
        domicile
        contact
      }
    }
  }
`;
