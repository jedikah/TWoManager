import gql from 'graphql-tag';
import { Client } from '../types';

export interface AddClientData {
  addClient: Client;
}

export const ADDCLIENT = gql`
  mutation($input: ClientAddInput!) {
    addClient(input: $input){
      clientId
      name
      domicile
      contact
    }
  }
`;
