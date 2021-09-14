import { reactive } from 'vue';

import { cloneDeep } from 'lodash';

import { useMutation } from '@vue/apollo-composable';

import { notifyThere, notifyThis } from '../context';
import { ClientsResult, MutationAddClientArgs } from '../types';
import { ADDCLIENT, AddClientData } from './useAddClients.gql';

const addClientsArgs = reactive<MutationAddClientArgs>({
  input: {
    name: 'client ',
    domicile: 'domicile ',
    contact: '0320000000',
  },
});

export const useAddClients = () => {
  const { mutate, onDone, onError } = useMutation<
    AddClientData,
    MutationAddClientArgs
  >(ADDCLIENT, {
    update: (cache, { data: { addClient } }) => {
      if (addClient) {
        cache.modify({
          fields: {
            clients: (
              existingData: ClientsResult,
              { readField: ReadFieldFunction }
            ) => {
              console.log({ existingData });
              return cloneDeep(existingData).clients.unshift(addClient);
            },
          },
        });
      }
    },
  });

  onDone(({ data, errors }) => {
    if (errors) notifyThere(errors);
    notifyThis({
      message: 'Client: ' + data.addClient.name + ' enregisté.',
      type: 'positive',
    });
  });

  onError((error) => {
    console.log(error);
  });

  const submit = () => {
    if (addClientsArgs.input.name !== '') mutate(addClientsArgs);
  };

  return { addClientsArgs, submit };
};
