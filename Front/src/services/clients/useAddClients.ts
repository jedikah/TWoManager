import { useMutation } from '@vue/apollo-composable';

import { ADDCLIENTBYUSER, AddClientByUserData } from './useAddClients.gql';
import { MutationAddClientsArgs, QueryClientsArgs } from '../types';
import { reactive } from 'vue';
import { notifyThere, notifyThis } from '../context';
import { CLIENTSUSER, UserClientData } from './useClients.gql';
import { clientsVariable } from './useClients';

export const useAddClients = () => {
  const addClientsVariable = reactive<MutationAddClientsArgs>({
    input: {
      name: 'client ',
      domicile: 'domicile ',
      contact: '0320000000'
    }
  });



  const { mutate, onDone, onError } = useMutation<
    AddClientByUserData,
    MutationAddClientsArgs
  >(ADDCLIENTBYUSER, {
    update: (cache, { data: {addClientByUser} }) => {

      if (addClientByUser) {

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
            message: 'Client client ' +
              addClientByUser.name +
              ' a bien été enregisté.',
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
