import { USERSLIST } from 'src/api/users/UsersList';
import graphqlClient from '../index';
import { context, notifyThere, notifyThis } from '../context';

export const usersList = async () => {
  const response = await graphqlClient.query({
    query: USERSLIST,
    errorPolicy: 'all'
  });

  return response.data.users;
};
