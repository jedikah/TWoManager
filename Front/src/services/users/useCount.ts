/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useResult } from '@vue/apollo-composable';
import { Ref } from 'vue';

import { notifyThere } from '../context';
import { USERSCOUNT, UsersCountData } from './useCount.gql';

export const usersCount = (): [Readonly<Ref<number | void>>] => {
  const { result, onResult } = useQuery<UsersCountData>(USERSCOUNT);

  const count = useResult(result);

  onResult(({ errors }) => {
    if (errors) notifyThere(errors);
  });

  return [count];
};
