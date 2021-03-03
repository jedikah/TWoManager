import { CHECKTOKEN, CheckTokenData } from './useCheckToken.gql';
import { apolloClient } from '../applloClient';
import { notifyThere, notifyThis } from '../context';
import { MutationCheckTokenArgs } from '../types';

export const checkToken = async (token?: string) => {
  if (!token) token = localStorage.getItem('token') || null;

  const message = 'Veuillez vous connecter pour ouvrir une nouvelle session.';

  let response = null;
  if (token)
    try {
      response = await apolloClient.mutate<
      CheckTokenData,
      MutationCheckTokenArgs
    >({
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

      return response.data.checkToken;
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      notifyThis({message: 'users query, checkToken: ' + err, type: 'warning'})
    }
  else notifyThis({message, type : 'info'});
};
