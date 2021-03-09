import gql from 'graphql-tag';
import { Client } from '../types';

export interface ClientsSearchData {
  clientsSearch: Array<Client>;
}

export const CLIENTSEARCH = gql`
  query($filter: ClientsSearchFilterInput!){
    clientsSearch(filter: $filter){
      clientId
      name
      contact
      domicile
    }
  }
`;
