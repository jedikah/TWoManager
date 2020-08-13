import { CHECKtOKEN } from 'src/api/users/checkToken';
import graphqlClient from '../index';
import { context, notifyThere, notifyThis } from '../context';

export const checkToken = async (token?: string) => {
  if (!token) token = localStorage.getItem('token') || null;

  const message = 'Veuillez vous connecter pour ouvrir une nouvelle session.';

  let response = null;
  if (token)
    try {
      response = await graphqlClient.query({
        query: CHECKtOKEN,
        variables: {
          input: token
        },
        fetchPolicy: 'network-only'
      });

      if (response.errors) {
        notifyThere(response.errors);
        return null;
      }

      return response.data.checkToken;
    } catch (err) {
      console.log('users query, checkToken: ', err);
    }
  else notifyThis(message, 'info');
};
