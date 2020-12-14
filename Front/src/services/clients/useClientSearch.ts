import { useQuery } from '@vue/apollo-composable';
import { reactive } from '@vue/composition-api';

import { CLIENTSUSER, UserClientData } from './useClientsUser.gql';
import { Client, QueryClientSearchArgs, QueryUserClientsArgs } from '../types';
import { notifyThere } from '../context';
import { logErrorMessages } from '@vue/apollo-util';
import { CLIENTSEARCH, ClientSearchData } from './useClientSearch.gql';

const state = reactive({
  resultName: '',
  clientFormSearch: []
});

export const useClientSearch = () => {
  const variables: QueryClientSearchArgs = reactive({
    input: {
      clientName: ''
    }
  });

  const { loading, onResult, onError, refetch } = useQuery<
    ClientSearchData,
    QueryClientSearchArgs
  >(CLIENTSEARCH, variables, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: false
  });

  onResult(({ data, errors, loading }) => {
    if (errors) notifyThere(errors);
    if (!loading && state.resultName !== '') {
      state[state.resultName] = data.clientSearch;
    } else if (!loading && state.resultName === '') {
      state.clientFormSearch = data.clientSearch;
    }
  });

  onError(error => {
    logErrorMessages(error);
  });

  function handleClientFormSearch(clientName: string) {
    state.resultName = 'clientFormSearch';
    variables.input.clientName = clientName;
    void refetch(variables);
  }
  function searchOptions(clients: Client[]) {
    return clients.map(client => {
      return {
        label: client.clientName,
        value: client.clientId
      };
    });
  }

  return {
    state,
    handleClientFormSearch,
    searchOptions,
    loading
  };
};
