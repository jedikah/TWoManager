import { useQuery } from '@vue/apollo-composable';
import { reactive } from '@vue/composition-api';

import { CHECKTOKEN, CheckTokenData } from 'src/api/users/checkToken';
import { QueryCheckTokenArgs } from 'src/api/types';
import { ApolloQueryResult } from 'apollo-client';

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
    input: ''
  });

  const { onResult, refetch } = useQuery<CheckTokenData, QueryCheckTokenArgs>(
    CHECKTOKEN,
    variables
  );

  return [onResult, variables, refetch];
};
