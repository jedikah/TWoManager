import gql from 'graphql-tag';
import { Model } from './../types';



export interface ModelsData {
  models: Model
}

export const MODELS = gql`
  query($input: ModelFilterInput!){
    models(input: $input) {
      modelId
      label
      content
    }
}
`
