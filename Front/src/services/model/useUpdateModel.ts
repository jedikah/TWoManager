import { reactive } from 'vue';

import { useMutation } from '@vue/apollo-composable';

import { notifyThere, notifyThis } from '../context';
import { MutationUpdateModelArgs } from '../types';
import { UPDATEMODEL, UpdateModelData } from './useUpdate.gql';

export const updateModelArgs = reactive<MutationUpdateModelArgs>({
  input: {
    id: -1,
    content: '[]',
    label: '',
    name: '',
  },
});

export const useUpdateModel = () => {
  const { mutate, onDone } = useMutation<
    UpdateModelData,
    MutationUpdateModelArgs
  >(UPDATEMODEL);

  onDone(({ data, errors }) => {
    if (errors) notifyThere(errors);

    notifyThis({
      message: 'Modification enregisté.',
      type: 'positive',
    });
  });

  const submit = () => {
    if (updateModelArgs.input.id !== -1) mutate(updateModelArgs);
  };

  return { submit, updateModelArgs };
};
