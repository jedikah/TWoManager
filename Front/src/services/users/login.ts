import { context, notifyThere, notifyThis } from '../context';
import graphqlClient from '../index';
import { LOGIN } from 'src/api/users/login';

export const logIn = async (login: string, password: string) => {
  try {
    const response = await graphqlClient.mutate({
      mutation: LOGIN,
      variables: {
        input: {
          login,
          password
        }
      }
    });

    if (response.errors) {
      notifyThere(response.errors);
      return null;
    }

    return response.data.login;
  } catch (err) {
    console.log({ errMezs: err.message });
  }
};
