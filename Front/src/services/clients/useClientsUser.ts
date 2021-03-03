import { useQuery, useResult } from '@vue/apollo-composable';
import { reactive, watch } from 'vue';

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
    pagination: {
      page: 1,
      itemCount: 0,
      rowsPerPage: 30,
      totalItems: 0,
      totalPages: 0
    }
  });

  const {
    loading: loadingClient,
    onResult,
    onError,
    refetch,
    result,
  } = useQuery<UserClientData, QueryUserClientsArgs>(CLIENTSUSER, variables, {
    fetchPolicy: 'cache-and-network',
  });

  onResult(({ data, errors }) => {
    if (errors) notifyThere(errors);

    if (data) {
      state.pagination.rowsPerPage =
        data.userClients.paginationMeta.itemsPerPage;
      state.pagination.itemCount = data.userClients.paginationMeta.totalItems;
      state.pagination.page = data.userClients.paginationMeta.currentPage;
      state.pagination.totalPages = data.userClients.paginationMeta.totalPages;
    }
  });

  onError(error => {
    logErrorMessages(error);
  });

  const clients = useResult(result, [], data => data.userClients.clients)

  watch(clients, (addFolders) => {
    console.log({addFolders})
  })

  function fetchMoreclient(page: number, limit = 30) {
    variables.paginationInput.page = page;
    variables.paginationInput.limit = limit;
    refetch(variables);
  }

  return {
    state,
    clients: useResult(result, [], data => data.userClients.clients),
    variables,
    fetchMoreclient,
    loadingClient
  };
};
