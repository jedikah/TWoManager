import { useQuery, useResult } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';
import { reactive } from 'vue';
import { notifyThere } from '../context';
import { QueryModelsArgs } from './../types';
import { ModelsData, MODELS } from './useModels.gql';


export const modelsVariable = reactive<QueryModelsArgs>({
  input: {
    label: ''
  }
})

export const useModel = () => {

  const {
    loading: loadingModels,
    onResult,
    onError,
    result
  } = useQuery<ModelsData, QueryModelsArgs>(
    MODELS, modelsVariable, {
      fetchPolicy: 'cache-and-network',
    }
  );

  onResult(({ data, errors }) => {
    if (errors) notifyThere(errors);
  });

  onError(error => {
    logErrorMessages(error);
  });

  const models = useResult(result, [], data => data.models)

  return {modelsVariable, loadingModels, models}
}
