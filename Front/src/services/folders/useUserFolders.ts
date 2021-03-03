import { useQuery, useResult } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';
import { reactive, watch } from 'vue';
import { notifyThere } from '../context';
import { QueryUserFoldersArgs } from '../types';
import { UserFoldersData, USER_FOLDERS } from './useUserFolders.gql';

export function useUserFolders() {
  const variables = reactive<QueryUserFoldersArgs>({
    foldersFilterInput: {
      register: '',
      numTitle: '',
      groundName: ''
    },
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

  const { result, loading, onResult, onError, refetch } = useQuery<
    UserFoldersData,
    QueryUserFoldersArgs
  >(USER_FOLDERS, variables, {fetchPolicy: 'cache-and-network'});

  onResult(({ data, errors }) => {
    if (errors) notifyThere(errors);

    if (data) {
      state.pagination.rowsPerPage =
        data.userFolders.paginationMeta.itemsPerPage;
      state.pagination.itemCount = data.userFolders.paginationMeta.totalItems;
      state.pagination.page = data.userFolders.paginationMeta.currentPage;
      state.pagination.totalPages = data.userFolders.paginationMeta.totalPages;
    }
  });

  onError(error => {
    logErrorMessages(error);
  });

  const folders = useResult(result, [], data => data.userFolders.folders)

  function fetchMoreFolder(page: number, limit = 30) {
    variables.paginationInput.page = page;
    variables.paginationInput.limit = limit;
    refetch(variables);
  }

  watch(folders, (addFolders) => {
    console.log({addFolders})
  })

  return {
    state,
    folders: useResult(result, [], data => data.userFolders.folders),
    loading,
    fetchMoreFolder
  };
}
