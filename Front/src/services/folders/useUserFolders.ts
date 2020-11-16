import { useQuery } from '@vue/apollo-composable';
import { reactive } from '@vue/composition-api';
import { QueryUserFoldersArgs } from '../types';
import { UserFoldersData, USER_FOLDERS } from './useUserFolders.gql';

export function useUserFoldersVars() {
  const vars = reactive<QueryUserFoldersArgs>({
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

  return {
    vars
  };
}

export function useUserFolders(variables: QueryUserFoldersArgs) {
  const { result, loading } = useQuery<UserFoldersData, QueryUserFoldersArgs>(
    USER_FOLDERS,
    variables
  );

  return {
    result,
    loading
  };
}
