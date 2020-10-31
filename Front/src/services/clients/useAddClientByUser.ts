import { useMutation, useApolloClient } from '@vue/apollo-composable';

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
    clientName: '',
    domicile: '',
    contact: ''
  });

  const apollo = useApolloClient();
  const variables: QueryUserClientsArgs = reactive({
    paginationInput: {
      limit: 30,
      page: 1
    }
  });

  const { mutate: senAddClient, onDone, onError } = useMutation<
    AddClientByUserData,
    MutationAddClientByUserArgs
  >(ADDCLIENTBYUSER, { context: context() });

  onDone(({ data, errors }) => {
    if (errors) notifyThere(errors);

    data.addClientByUser;

    if (data.addClientByUser) {
      const prevClient = apollo.client.cache.readQuery<
        UserClientData,
        QueryUserClientsArgs
      >({
        query: CLIENTSUSER,
        variables
      });

      if (prevClient) {
        prevClient.userClients.clients.push(data.addClientByUser);

        apollo.client.writeQuery<UserClientData>({
          query: CLIENTSUSER,
          data: prevClient
        });
      }

      state.clientName = null;
      state.domicile = '';
      state.contact = '';

      notifyThis(
        'Client client ' +
          data.addClientByUser.clientName +
          ' a bien été enregisté.',
        'positive'
      );
    }
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
