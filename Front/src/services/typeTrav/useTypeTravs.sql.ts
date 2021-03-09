import gql from 'graphql-tag';
import { TypeTrav } from '../types';


export interface TypeTravsData {
  typeTravs: TypeTrav[]
}

export const TYPETRAVS = gql`
  query{
    typeTravs{
      typeTravId
      label
      model{
        modelId
        label
        content
      }
    }
  }
`
