import graphqlClient from '../index';
import { context, notifyThere, notifyThis } from '../context';
import { USERSCOUNT } from 'src/api/users/usersCount';

export const usersCount = async () => {
  const response = await graphqlClient.query({
    query: USERSCOUNT,
    errorPolicy: 'all'
  });

  if (response.errors) notifyThere(response.errors);

  return response.data.usersCount;
};
