import { USERSLIST } from 'src/api/users/UsersList';
import graphqlClient from '../index';
import { context, notifyThere, notifyThis } from '../context';
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';

export const usersList = async () => {
  const response = await graphqlClient.query({
    query: USERSLIST,
    errorPolicy: 'all'
  });

  return response.data.users;
};

export const useUserlist = () => {
  const { result } = useQuery(USERSLIST, () => ({ context }));

  return result;
};
