import { LOGINSESSION } from 'src/api/users/loginSession';
import graphqlClient from '../index';
import { context, notifyThere, notifyThis } from '../context';

export const loginSession = async (login: string, password: string) => {
  console.log({ login, password });
  try {
    const response = await graphqlClient.query({
      query: LOGINSESSION,
      variables: {
        input: {
          login,
          password
        }
      },
      fetchPolicy: 'network-only',
      context: context()
    });

    if (response.errors) {
      notifyThere(response.errors);
      return null;
    }

    return response.data.loginSession;
  } catch (err) {
    console.log({ errMezs: err.message });
  }
};
