import { useQuery } from '@vue/apollo-composable';
import { Ref, reactive } from '@vue/composition-api';

import { CLIENTSUSER, UserClientData } from 'src/api/clients/userClients';
import { QueryUserClientsArgs } from 'src/api/types';
import { notifyThere } from '../context';
import { logErrorMessages } from '@vue/apollo-util';

export const useClientsUser = (): {
  state: {
    lastIndex: number;
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
    lastIndex: 0,
    data: new Array(24),
    hasMore: false,
    cursor: 0,
    stop: false,
    pagination: {
      rowsPerPage: 0
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
    if (data.userClients.hasMore === false) state.stop = true;

    state.hasMore = data.userClients.hasMore;
    state.cursor = data.userClients.cursor;

    data.userClients.clients.forEach(client => {
      state.data.splice(state.lastIndex, 1, {
        index: state.lastIndex + 1,
        ...client
      });
      state.lastIndex++;
    });

    if (data.userClients.hasMore == false) state.stop = true;
  }

  onResult(({ data, errors, loading }) => {
    if (errors) notifyThere(errors);

    if (!loading && !state.stop) pushData(data);
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
