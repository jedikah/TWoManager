import { USERSLIST } from './useList.gql';
import { context } from '../context';
import { useQuery } from '@vue/apollo-composable';

export const useUserlist = () => {
  const { result } = useQuery(USERSLIST, () => ({ context }));

  return result;
};
