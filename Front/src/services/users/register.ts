import graphqlClient from '../index';

import { REGISTER } from 'src/api/users/register';

export const register = async (
  userName: string,
  login: string,
  password: string,
  photo?: string
) => {
  const response = await graphqlClient.mutate({
    mutation: REGISTER,
    variables: {
      input: { userName, login, password, photo }
    }
  });
  console.log({ data: response.data });
  return response.data.register;
};
