import { reactive } from 'vue';

import { useQuery, useResult } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';

import { notifyThere } from '../context';
import { QueryClientsSearchArgs } from '../types';
import { CLIENTSEARCH, ClientsSearchData } from './useClientSearch.gql';

const clientsSearchVariables = reactive<QueryClientsSearchArgs>({
  filter: {
    name: '',
    limit: 5,
  },
});

export const useClientSearch = () => {
  const { loading, onResult, onError, refetch, result } = useQuery<
    ClientsSearchData,
    QueryClientsSearchArgs
  >(CLIENTSEARCH, clientsSearchVariables, {
    fetchPolicy: 'cache-and-network',
  });

  onResult(({ errors, data }) => {
    if (errors) notifyThere(errors);

    console.log({ data });
  });

  onError((error) => {
    logErrorMessages(error);
  });

  const searchOptions = useResult(result, [], (data) =>
    data.clientsSearch.map((client) => ({
      label: client.name,
      value: client.id,
    }))
  );

  function handleClientFormSearch(name = '') {
    clientsSearchVariables.filter.name = name;
    void refetch(clientsSearchVariables);
  }

  return {
    clientsSearchVariables,
    handleClientFormSearch,
    searchOptions,
    loading,
  };
};
