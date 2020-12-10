import { useMutation } from '@vue/apollo-composable';

import { ADDCLIENTBYUSER, AddClientByUserData } from './useAddClientByUser.gql';
import {
  MutationAddClientByUserArgs,
  ClientAddInput,
  QueryUserClientsArgs
} from '../types';
import { reactive } from '@vue/composition-api';
import { notifyThere, notifyThis, context } from '../context';
import { logErrorMessages } from '@vue/apollo-util';
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
    context: context(),
    update: (cache, { data }) => {
      if (data?.addClientByUser) {
        const dataCache = cache.readQuery<UserClientData, QueryUserClientsArgs>(
          {
            query: CLIENTSUSER,
            variables: { paginationInput: variables.paginationInput }
          }
        );
        if (dataCache?.userClients) {
          dataCache.userClients.clients.unshift(data.addClientByUser);
          cache.writeQuery<UserClientData>({
            query: CLIENTSUSER,
            data: dataCache
          });
          notifyThis(
            'Client client ' +
              data.addClientByUser.clientName +
              ' a bien été enregisté.',
            'positive'
          );
        }
      }
    }
  });

  onDone(({ data, errors }) => {
    if (errors) notifyThere(errors);

    data.addClientByUser;
  });

  onError(error => {
    console.log('errorrrrrrr');
    logErrorMessages(error);
  });

  const submit = () => {
    console.log({ state });

    if (state.clientName !== '') void senAddClient({ input: state });
  };

  return [state, submit];
};
