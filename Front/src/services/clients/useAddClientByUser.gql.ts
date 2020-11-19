import gql from 'graphql-tag';
import { Client } from '../types';

export interface AddClientByUserData {
  addClientByUser: Client;
}

export const ADDCLIENTBYUSER = gql`
  mutation AddClientByUser($input: ClientAddInput!) {
    addClientByUser(input: $input) {
      clientId
      clientName
      domicile
      contact
    }
  }
`;
