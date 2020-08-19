import gql from 'graphql-tag';
import { ClientEntity } from '../types';

export interface AddClientByUserData {
  addClientByUser: ClientEntity;
}

export const ADDCLIENTBYUSER = gql`
  mutation($input: ClientInput!) {
    addClientByUser(input: $input) {
      clientId
      clientName
      domicile
      contact
    }
  }
`;
