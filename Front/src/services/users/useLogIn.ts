import { useMutation } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';
import { reactive, Ref } from '@vue/composition-api';
import { useActions } from '@u3u/vue-hooks';

import { LOGIN, LogInData } from './useLogin.gql';
import { notifyThere } from '../context';
import { LogInInput, MutationLoginArgs } from '../types';
import { Router } from 'src/router';
import { useSession } from '../session/useSession';

export const useLogIn = (): [LogInInput, () => void, Ref<boolean>] => {
  const { mutate: sendLogIn, onDone, onError, loading } = useMutation<
    LogInData,
    MutationLoginArgs
  >(LOGIN);

  const logIn: LogInInput = reactive({
    login: 'jedikah',
    password: '123'
  });

  const {
    state: sessionState,
    checkToken,
    onDone: onChectTonkenDone
  } = useSession();

  onDone(({ data: logInData, errors }) => {
    if (errors) notifyThere(errors);

    localStorage.setItem('token', logInData.login.token);

    checkToken(logInData.login.token);
  });

  onChectTonkenDone(({ data: checkTokenData, errors }) => {
    if (errors) notifyThere(errors);

    logIn.login = '';
    logIn.password = '';
    sessionState.session = true;
    Router.push('/main');
  });

  onError(error => {
    logErrorMessages(error);
  });

  const submitLogIn = () => {
    if (logIn.login !== '' && logIn.password !== '')
      sendLogIn({
        input: {
          login: logIn.login,
          password: logIn.password
        }
      });
  };

  return [logIn, submitLogIn, loading];
};
