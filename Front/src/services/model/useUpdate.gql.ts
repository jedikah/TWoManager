import gql from 'graphql-tag';

import { Model } from '../types';

export interface UpdateModelData {
  updateModel: Model;
}

export const UPDATEMODEL = gql`
  mutation ($input: ModelUpdateInput!) {
    updateModel(input: $input) {
      id
      label
      content
      name
    }
  }
`;
