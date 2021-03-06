import gql from 'graphql-tag';
import { Model } from '../types';

export interface AddModelData {
  addModel: Model;
}

export const ADDMODEL = gql`
  mutation($input: ModelAddInput!){
  addModel(input: $input){
    modelId
    label
    content
  }
}
`;
