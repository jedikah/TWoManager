import { computed, reactive, ref } from 'vue';

import { useQuery, useResult } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';

import { notifyThere } from '../context';
import { ROWS_PER_PAGE } from '../session/constant';
import { QueryClientsArgs } from '../types';
import { CLIENTSUSER, UserClientData } from './useClients.gql';

export const queryClientArgs = reactive<QueryClientsArgs>({
  filter: {},
  pagination: {
    limit: ROWS_PER_PAGE,
    page: 1,
  },
});

export const useClients = () => {
  const enabled = ref(true);
  const {
    loading: loadingClient,
    onResult,
    onError,
    refetch,
    result,
  } = useQuery<UserClientData, QueryClientsArgs>(CLIENTSUSER, queryClientArgs);

  // fetchMoreclient();

  onResult(({ data, errors }) => {
    if (errors) notifyThere(errors);

    enabled.value = false;
  });

  onError((error) => {
    logErrorMessages(error);
  });

  const clients = useResult(result, [], (data) => data.clients.clients);

  const pagination = computed({
    get: () =>
      result.value
        ? {
            rowsPerPage: result.value.clients.paginationMeta.itemsPerPage,
            itemCount: result.value.clients.paginationMeta.totalItems,
            page: result.value.clients.paginationMeta.currentPage,
            totalPages: result.value.clients.paginationMeta.totalPages,
          }
        : {
            rowsPerPage: ROWS_PER_PAGE,
            itemCount: 0,
            page: 1,
            totalPages: 0,
          },
    set: (val) => {
      //
    },
  });

  function fetchMoreclient(page = 1, limit = ROWS_PER_PAGE) {
    queryClientArgs.pagination.page = page;
    queryClientArgs.pagination.limit = limit;
    refetch(queryClientArgs);
  }

  return {
    pagination,
    result,
    clients,
    queryClientArgs,
    fetchMoreclient,
    loadingClient,
  };
};
