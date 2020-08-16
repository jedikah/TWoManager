import { useMutation } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';
import { reactive, Ref } from '@vue/composition-api';
import { useState, useGetters, useActions } from '@u3u/vue-hooks';

import { LOGIN, LogInData } from 'src/api/users/login';
import { notifyThis } from '../context';
import { LoginInput, MutationLoginArgs } from 'src/api/types';
import { useCheckToken } from './useCheckToken';

export const useLogIn = (): [LoginInput, () => void, Ref<boolean>] => {
  const { mutate: sendLogIn, onDone, onError, loading } = useMutation<
    LogInData,
    MutationLoginArgs
  >(LOGIN);

  const logIn: LoginInput = reactive({
    login: 'jedikah',
    password: '123'
  });

  const [
    onChectTonkenResult,
    checkTonkenVariable,
    checkTokenRefetch
  ] = useCheckToken();

  const actions = {
    ...useActions('sessionModule', {
      setSession: 'setSession',
      setCurrentUser: 'setCurrentUser'
    })
  };

  onDone(({ data: logInData }) => {
    logIn.login = '';
    logIn.password = '';

    checkTonkenVariable.input = logInData.login.token;

    checkTokenRefetch();

    onChectTonkenResult(({ data: checkTokenData }) => {
      console.log({ logInData, checkTokenData });
      actions.setSession(true);
      actions.setCurrentUser(checkTokenData.checkToken);
    });
  });

  onError(error => {
    logErrorMessages(error);
    notifyThis(error.message);
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
