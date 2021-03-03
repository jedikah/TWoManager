import { useMutation } from '@vue/apollo-composable';

import { ADDCLIENTBYUSER, AddClientByUserData } from './useAddClientByUser.gql';
import {
  MutationAddClientByUserArgs,
  ClientAddInput,
  QueryUserClientsArgs
} from '../types';
import { reactive } from 'vue';
import { notifyThere, notifyThis } from '../context';
import { CLIENTSUSER, UserClientData } from './useClientsUser.gql';

export const useAddClientByUser = (): [ClientAddInput, () => void] => {
  const state: ClientAddInput = reactive({
    clientName: 'client ',
    domicile: 'domicile ',
    contact: '0320000000'
  });

  const variables: QueryUserClientsArgs = reactive({
    paginationInput: {
      limit: 30,
      page: 1
    }
  });

  const { mutate: senAddClient, onDone, onError } = useMutation<
    AddClientByUserData,
    MutationAddClientByUserArgs
  >(ADDCLIENTBYUSER, {
    update: (cache, { data: {addClientByUser} }) => {

      if (addClientByUser) {

        const dataCache = cache.readQuery<UserClientData, QueryUserClientsArgs>(
          {
            query: CLIENTSUSER,
            variables: { paginationInput: variables.paginationInput }
          }
        );

          cache.writeQuery<UserClientData>({
            query: CLIENTSUSER,
            data: dataCache
          });

          notifyThis({
            message: 'Client client ' +
              addClientByUser.clientName +
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
    console.log('errorrrrrrr');
    // logErrorMessages(error);
  });

  const submit = () => {
    console.log({ state });

    if (state.clientName !== '') senAddClient({ input: state });
  };

  return [state, submit];
};
