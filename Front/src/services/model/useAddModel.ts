import { reactive } from 'vue-demi';

import { useMutation } from '@vue/apollo-composable';

import { notifyThere, notifyThis } from '../context';
import { MutationAddModelArgs, QueryModelsArgs } from '../types';
import { ADDMODEL, AddModelData } from './useAddModel.gql';
import { modelsVariable } from './useModels';
import { MODELS, ModelsData } from './useModels.gql';

export const addModelVariable = reactive<MutationAddModelArgs>({
  input: {
    content: '[]',
    label: '',
    name: '',
  },
});

export const useAddModel = () => {
  const { mutate, onDone, onError } = useMutation<
    AddModelData,
    MutationAddModelArgs
  >(ADDMODEL, {
    update: (cache, { data: { addModel } }) => {
      if (addModel) {
        const dataCache = cache.readQuery<ModelsData, QueryModelsArgs>({
          query: MODELS,
          variables: modelsVariable,
        });

        cache.writeQuery<ModelsData>({
          query: MODELS,
          data: dataCache,
        });

        notifyThis({
          message: 'Le model ' + addModel.label + ' a bien été enregisté.',
          type: 'positive',
        });
      }
    },
  });

  onDone(({ data, errors }) => {
    if (errors) notifyThere(errors);
  });

  onError((error) => {
    console.log(error);
  });

  function submit() {
    if (addModelVariable.input.label) mutate(addModelVariable);
  }

  return { addModelVariable, submit };
};
