import { useMutation } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';
import { reactive, Ref } from '@vue/composition-api';

import { LOGIN, LoginInputData } from 'src/api/users/login';
import { notifyThis } from '../context';
import { LoginInput, MutationLoginArgs } from 'src/api/types';

export const useLogIn = (): [LoginInput, () => void, Ref<boolean>] => {
  const { mutate: sendLogIn, onDone, onError, loading } = useMutation<
    LoginInputData,
    MutationLoginArgs
  >(LOGIN);

  const logIn: LoginInput = reactive({
    login: 'jedikah',
    password: '123'
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
