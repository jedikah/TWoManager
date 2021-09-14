import { reactive } from 'vue';

import { useQuery, useResult } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';

import { notifyThere } from '../context';
import { ROWS_PER_PAGE } from '../session/constant';
import { QueryUserFoldersArgs } from '../types';
import { USER_FOLDERS, UserFoldersData } from './useUserFolders.gql';

export const userFoldersvariable = reactive<QueryUserFoldersArgs>({
  filter: {
    register: '',
    numTitle: '',
    groundName: '',
  },
  pagination: {
    limit: ROWS_PER_PAGE,
    page: 1,
  },
});

export function useUserFolders() {
  const state = reactive({
    pagination: {
      page: 1,
      itemCount: 0,
      rowsPerPage: ROWS_PER_PAGE,
      totalItems: 0,
      totalPages: 0,
    },
  });

  const { result, loading, onResult, onError, refetch } = useQuery<
    UserFoldersData,
    QueryUserFoldersArgs
  >(USER_FOLDERS, userFoldersvariable, {
    fetchPolicy: 'cache-first',
  });

  onResult(({ data, errors }) => {
    if (errors) notifyThere(errors);

    console.log({ data });

    if (data) {
      state.pagination.rowsPerPage =
        data.userFolders.paginationMeta.itemsPerPage;
      state.pagination.itemCount = data.userFolders.paginationMeta.totalItems;
      state.pagination.page = data.userFolders.paginationMeta.currentPage;
      state.pagination.totalPages = data.userFolders.paginationMeta.totalPages;
    }
  });

  onError((error) => {
    logErrorMessages(error);
  });

  const folders = useResult(result, [], (data) => data.userFolders.folders);

  function fetchMoreFolder(page: number, limit = ROWS_PER_PAGE) {
    userFoldersvariable.pagination.page = page;
    userFoldersvariable.pagination.limit = limit;
    refetch(userFoldersvariable);
  }

  return {
    state,
    folders,
    loading,
    fetchMoreFolder,
  };
}
