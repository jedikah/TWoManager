import { useMutation } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';
import { reactive, Ref } from 'vue';

import { LOGIN, LogInData } from './useLogin.gql';
import { notifyThere } from '../context';
import { LogInInput, MutationLoginArgs } from '../types';
import { useRouter } from 'vue-router';
import { useSession } from '../session/useSession';

export const useLogIn = ()=> {
  const { mutate: sendLogIn, onDone: onSendDone, onError, loading } = useMutation<
    LogInData,
    MutationLoginArgs
  >(LOGIN);

  const logIn: LogInInput = reactive({
    login: 'jedikah',
    password: '123'
  });
  const router = useRouter();

  const {
    state: sessionState,
    checkToken,
    onDone: onChectTonkenDone
  } = useSession();

  onSendDone(({ data: logInData, errors }) => {
    if (errors) notifyThere(errors);
    console.log('+++++++++++++++++++++ SEND +++++++++++++++++++++++++')


    localStorage.setItem('token', logInData.login.token);

    checkToken(logInData.login.token);
  });

  onChectTonkenDone(({ errors }) => {
    if (errors) notifyThere(errors);
    console.log('+++++++++++++++++++++ TOKEN +++++++++++++++++++++++++')

    logIn.login = '';
    logIn.password = '';
    sessionState.session = true;
    router.push('/main');
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

  return {logIn, submitLogIn, loading};
};
