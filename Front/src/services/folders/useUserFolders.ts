import { useQuery, useResult } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';
import { reactive } from 'vue';
import { notifyThere } from '../context';
import { QueryUserFoldersArgs } from '../types';
import { UserFoldersData, USER_FOLDERS } from './useUserFolders.gql';


export const userFoldersvariable = reactive<QueryUserFoldersArgs>({
  filter: {
    register: '',
    numTitle: '',
    groundName: ''
  },
  pagination: {
    limit: 30,
    page: 1
  }
});

export function useUserFolders() {

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
    result,
    loading,
    onResult,
    onError,
    refetch
  } = useQuery<UserFoldersData,QueryUserFoldersArgs >(USER_FOLDERS, userFoldersvariable, {
    fetchPolicy: 'cache-and-network'
  });

  onResult(({ data, errors }) => {
    if (errors) notifyThere(errors);

    console.log({ data })

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
    userFoldersvariable.pagination.page = page;
    userFoldersvariable.pagination.limit = limit;
    refetch(userFoldersvariable);
  }

  return {
    state,
    folders,
    loading,
    fetchMoreFolder
  };
}
