import gql from 'graphql-tag';
import { Client } from '../types';

export interface ClientSearchData {
  clientSearch: Array<Client>;
}

export const CLIENTSEARCH = gql`
  query ClientSearch($input: ClientSearchInput!) {
    clientSearch(input: $input) {
      clientId
      clientName
      domicile
      contact
    }
  }
`;
