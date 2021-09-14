import { gql } from '@apollo/client/core';

import { Client } from '../types';

export interface UpdateClientData {
  updateClient: Client;
}

export const UPDATECLIENT = gql`
  mutation ($input: ClientUpdateInput!) {
    updateClient(input: $input) {
      id
      name
      domicile
      contact
    }
  }
`;
