import { useMutation } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';
import { reactive, Ref } from '@vue/composition-api';
import { useActions } from '@u3u/vue-hooks';

import { LOGIN, LogInData } from 'src/api/users/login';
import { notifyThere } from '../context';
import { LogInInput, MutationLoginArgs } from 'src/api/types';
import { useCheckToken } from './useCheckToken';
import { Router } from 'src/router';

export const useLogIn = (): [LogInInput, () => void, Ref<boolean>] => {
  const { mutate: sendLogIn, onDone, onError, loading } = useMutation<
    LogInData,
    MutationLoginArgs
  >(LOGIN);

  const logIn: LogInInput = reactive({
    login: 'jedikah',
    password: '123'
  });

  const [
    onChectTonkenDone,
    checkTonkenVariable,
    toCheckTokenMutate
  ] = useCheckToken();

  const actions = {
    ...useActions('sessionModule', {
      setSession: 'setSession',
      setCurrentUser: 'setCurrentUser'
    })
  };

  onDone(({ data: logInData, errors }) => {
    if (errors) notifyThere(errors);

    localStorage.setItem('token', logInData.login.token);

    checkTonkenVariable.input = logInData.login.token;

    toCheckTokenMutate();

    onChectTonkenDone(({ data: checkTokenData, errors }) => {
      if (errors) notifyThere(errors);

      logIn.login = '';
      logIn.password = '';

      actions.setSession(true);
      actions.setCurrentUser(checkTokenData.checkToken);
      Router.replace('/main');
    });
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
