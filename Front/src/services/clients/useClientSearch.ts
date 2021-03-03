import { useQuery, useResult } from '@vue/apollo-composable';
import { reactive } from 'vue';

import { Client, QueryClientSearchArgs } from '../types';
import { notifyThere } from '../context';
import { logErrorMessages } from '@vue/apollo-util';
import { CLIENTSEARCH, ClientSearchData } from './useClientSearch.gql';

type ResuleName = 'clientFormSearch'
interface ClientState {
  resultName: string
}

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

  const { loading, onResult, onError, refetch, result } = useQuery<
    ClientSearchData,
    QueryClientSearchArgs
  >(CLIENTSEARCH, variables, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: false
  });

  onResult(({ data, errors, loading }) => {
    if (errors) notifyThere(errors);
    if (!loading && state.resultName !== '') {
      // state[state.resultName] = data.clientSearch;
    } else if (!loading && state.resultName === '') {
      state.clientFormSearch = data.clientSearch;
    }
  });


  onError(error => {
    logErrorMessages(error);
  });

  const searchOptions = useResult(result,
    [],
    result => result.clientSearch.map(client =>
    ({
      label: client.clientName,
      value: client.clientId
    })))

  function handleClientFormSearch(clientName: string) {
    state.resultName = 'clientFormSearch';
    variables.input.clientName = clientName;
    void refetch(variables);
  }

  return {
    state,
    handleClientFormSearch,
    searchOptions,
    loading,
    result
  };
};
