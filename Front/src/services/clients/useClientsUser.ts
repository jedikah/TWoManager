import { useQuery } from '@vue/apollo-composable';
import { Ref, reactive } from '@vue/composition-api';

import { CLIENTSUSER, UserClientData } from './useClientsUser.gql';
import { QueryUserClientsArgs } from '../types';
import { notifyThere } from '../context';
import { logErrorMessages } from '@vue/apollo-util';

export const useClientsUser = () => {
  const variables: QueryUserClientsArgs = reactive({
    paginationInput: {
      limit: 30,
      page: 1
    }
  });

  const state = reactive({
    meta: {
      currentPage: 1,
      itemCount: 0,
      itemsPerPage: 0,
      totalItems: 0,
      totalPages: 0
    },
    lastIndex: 0,
    data: [],
    loadingTableRow: false,
    pagination: {
      rowsPerPage: 0
    }
  });

  const { loading: loadingClient, onResult, onError, refetch } = useQuery<
    UserClientData,
    QueryUserClientsArgs
  >(CLIENTSUSER, variables, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: false
  });

  function pushData(data: UserClientData) {
    data.userClients.clients.forEach(client => {
      client.clientName;
      state.data.splice(state.lastIndex, 1, {
        index: ++state.lastIndex,
        ...client
      });
    });
  }

  onResult(({ data, errors, loading }) => {
    if (!loading && state.data.length <= 0) {
      state.meta = data.userClients.paginationMeta;
      state.data = new Array(state.meta.totalItems);
    }
    if (errors) notifyThere(errors);

    console.log(data.userClients.clients);

    if (!loading && state.meta.currentPage <= state.meta.totalPages) {
      pushData(data);
    }
  });

  onError(error => {
    logErrorMessages(error);
  });

  function fetchMoreclient(page: number, limit = 30) {
    variables.paginationInput.page = page;
    variables.paginationInput.limit = limit;
    void refetch(variables);
  }

  return {
    state,
    variables,
    fetchMoreclient,
    loadingClient
  };
};
