import { useQuery } from '@vue/apollo-composable';
import { reactive } from '@vue/composition-api';

import { CHECKTOKEN, CheckTokenData } from 'src/api/users/checkToken';
import { QueryCheckTokenArgs, CheckTokenOutput } from 'src/api/types';
import { ApolloQueryResult } from 'apollo-client';
import { logErrorMessages } from '@vue/apollo-util';
import { Router } from 'src/router';

export const useCheckToken = (): [
  (
    fn: (param?: ApolloQueryResult<CheckTokenData>) => void
  ) => {
    off: () => void;
  },
  {
    input: string;
  },
  (
    variables?: QueryCheckTokenArgs
  ) => Promise<ApolloQueryResult<CheckTokenData>>
] => {
  const variables = reactive({
    input: localStorage.getItem('token') || ''
  });

  const { onResult, refetch, onError } = useQuery<
    CheckTokenData,
    QueryCheckTokenArgs
  >(CHECKTOKEN, variables);

  onError(error => {
    logErrorMessages(error);
    Router.replace('/');
  });

  return [onResult, variables, refetch];
};
