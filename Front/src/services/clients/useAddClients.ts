import { useMutation } from '@vue/apollo-composable';

import { ADDCLIENT, AddClientData } from './useAddClients.gql';
import { MutationAddClientArgs, QueryClientsArgs } from '../types';
import { reactive } from 'vue';
import { notifyThere, notifyThis } from '../context';
import { CLIENTSUSER, UserClientData } from './useClients.gql';
import { clientsVariable } from './useClients';

export const useAddClients = () => {
  const addClientsVariable = reactive<MutationAddClientArgs>({
    input: {
      name: 'client ',
      domicile: 'domicile ',
      contact: '0320000000'
    }
  });



  const { mutate, onDone, onError } = useMutation<
    AddClientData,
    MutationAddClientArgs
  >(ADDCLIENT, {
    update: (cache, { data: {addClient} }) => {

      if (addClient) {

        clientsVariable.pagination.page = 1;
        clientsVariable.pagination.limit = 30;

        const dataCache = cache.readQuery<UserClientData, QueryClientsArgs>(
          {
            query: CLIENTSUSER,
            variables: clientsVariable
          }
        );

          cache.writeQuery<UserClientData>({
            query: CLIENTSUSER,
            data: dataCache
          });

          notifyThis({
            message: 'Client ' +
              addClient.name +
              ' enregisté.',
            type: 'positive'
          });
      }
    }
  });

  onDone(({ data, errors }) => {
    if (errors) notifyThere(errors);
    console.log(data);
  });

  onError(error => {
    console.log(error);
  });

  const submit = () => {
    if (addClientsVariable.input.name !== '') mutate(addClientsVariable);
  };

  return {addClientsVariable, submit};
};
