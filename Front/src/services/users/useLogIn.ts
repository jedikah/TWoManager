import { useMutation } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';
import { ref, reactive } from '@vue/composition-api';

import { logIn } from '../store/state';
import { LOGIN } from 'src/api/users/login';
import { notifyThis } from '../context';

export const useLogIn = () => {
  const { onDone, onError, loading } = useMutation(LOGIN, {
    variables: {
      input: {
        login: logIn.login,
        password: logIn.password
      }
    }
  });

  onDone(({ data }) => {
    logIn.login = '';
    logIn.password = '';

    console.log({ data });
  });

  onError(error => {
    logErrorMessages(error);
    notifyThis(error.message);
  });

  return { loading };
};
