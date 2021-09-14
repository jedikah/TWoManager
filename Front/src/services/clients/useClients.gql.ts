import gql from 'graphql-tag';

import { ClientsResult } from '../types';

export interface UserClientData {
  clients: ClientsResult;
}

export const CLIENTSUSER = gql`
  query ($filter: ClientsFilterInput!, $pagination: PaginationInput!) {
    clients(filter: $filter, pagination: $pagination) {
      clients {
        id
        name
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
