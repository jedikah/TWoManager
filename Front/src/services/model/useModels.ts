import { reactive } from 'vue';

import { useQuery, useResult } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';

import { notifyThere } from '../context';
import { QueryModelsArgs } from '../types';
import { MODELS, ModelsData } from './useModels.gql';

export const modelsVariable = reactive<QueryModelsArgs>({
  input: {
    label: '',
    name: '',
  },
});

export const useModel = () => {
  const {
    loading: loadingModels,
    onResult,
    onError,
    result,
  } = useQuery<ModelsData, QueryModelsArgs>(MODELS, modelsVariable, {
    fetchPolicy: 'cache-first',
  });

  onResult(({ data, errors }) => {
    if (errors) notifyThere(errors);
  });

  onError((error) => {
    logErrorMessages(error);
  });

  const models = useResult(result, [], (data) => data.models);

  return {
    modelsVariable,
    loadingModels,
    models,
  };
};
