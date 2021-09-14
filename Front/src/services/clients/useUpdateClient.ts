import { reactive } from 'vue';

import { useMutation } from '@vue/apollo-composable';

import { notifyThere, notifyThis } from '../context';
import { MutationUpdateClientArgs } from '../types';
import { UPDATECLIENT, UpdateClientData } from './useUpdateClients.gql';

export const updateClientArgs = reactive<MutationUpdateClientArgs>({
  input: {
    id: -1,
    name: '',
    domicile: '',
    contact: null,
  },
});
export const useUpdateClient = () => {
  const { onDone, mutate } = useMutation<
    UpdateClientData,
    MutationUpdateClientArgs
  >(UPDATECLIENT);

  onDone(({ data, errors }) => {
    if (errors) notifyThere(errors);

    notifyThis({
      message: 'Modification enregisté.',
      type: 'positive',
    });
  });

  function submit() {
    if (updateClientArgs.input.id !== -1) mutate(updateClientArgs);
  }

  return { submit, updateClientArgs };
};
