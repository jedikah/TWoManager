import { CHECKTOKEN } from 'src/api/users/checkToken';
import graphqlClient from '../index';
import { context, notifyThere, notifyThis } from '../context';

export const checkToken = async (token?: string) => {
  if (!token) token = localStorage.getItem('token') || null;

  const message = 'Veuillez vous connecter pour ouvrir une nouvelle session.';

  let response = null;
  if (token)
    try {
      console.log('**********************');
      response = await graphqlClient.mutate({
        mutation: CHECKTOKEN,
        variables: {
          input: token
        },
        fetchPolicy: 'no-cache'
      });

      if (response.errors) {
        notifyThere(response.errors);
        return null;
      }
      console.log({ response });

      return response.data.checkToken;
    } catch (err) {
      console.log('users query, checkToken: ', err);
    }
  else notifyThis(message, 'info');
};
