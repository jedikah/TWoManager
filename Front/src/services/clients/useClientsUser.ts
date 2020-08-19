import { useQuery } from '@vue/apollo-composable';
import { Ref, reactive } from '@vue/composition-api';

import { CLIENTSUSER, UserClientData } from 'src/api/clients/userClients';
import { QueryUserClientsArgs } from 'src/api/types';
import { notifyThere } from '../context';
import { logErrorMessages } from '@vue/apollo-util';

export const useClientsUser = (): {
  state: {
    index: number;
    data: any[];
    hasMore: boolean;
    cursor: number;
    stop: boolean;
    pagination: {
      rowsPerPage: number;
    };
  };
  variables: QueryUserClientsArgs;

  fetchMoreclient: () => void;

  loadingClient: Ref<boolean>;
} => {
  const variables: QueryUserClientsArgs = reactive({
    after: 0,
    pageSize: 10
  });

  const state = reactive({
    index: 0,
    data: [],
    hasMore: false,
    cursor: 0,
    stop: false,
    pagination: {
      rowsPerPage: 0,
      rowNumber: 24
    }
  });

  const {
    result,
    loading: loadingClient,
    onResult,
    onError,
    refetch
  } = useQuery<UserClientData, QueryUserClientsArgs>(CLIENTSUSER, variables, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: false
  });

  function pushData(data: UserClientData) {
    data.userClients.clients.forEach(client => {
      if (data.userClients.hasMore === false) state.stop = true;
      state.hasMore = data.userClients.hasMore;
      state.cursor = data.userClients.cursor;
      state.data.push({ ...client, index: state.index++ });
    });
  }

  onResult(({ data, errors, loading }) => {
    if (errors) notifyThere(errors);

    if (!loading && data.userClients.cursor) {
      console.log({ hasmore: data.userClients.hasMore });
      pushData(data);
    }
  });

  onError(error => {
    logErrorMessages(error);
  });

  function fetchMoreclient() {
    variables.after = result.value.userClients.cursor;
    variables.pageSize = 10;

    if (result.value.userClients.hasMore === true) refetch(variables);
  }

  return {
    state,
    variables,
    fetchMoreclient,
    loadingClient
  };
};
