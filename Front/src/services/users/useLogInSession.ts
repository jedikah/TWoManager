import { MutationLoginArgs, LoginInput } from 'src/api/types';
import { reactive } from '@vue/composition-api';
import { logErrorMessages } from '@vue/apollo-util';
import { useMutation } from '@vue/apollo-composable';
import { useActions } from '@u3u/vue-hooks';

import { LOGINSESSION, LogInSessionData } from 'src/api/users/loginSession';
import { useCheckToken } from './useCheckToken';

export const useLogInSession = (): [LoginInput, () => void] => {
  const logInSessionState: LoginInput = reactive({
    login: '',
    password: ''
  });

  const actions = {
    ...useActions('sessionModule', ['setSession'])
  };

  const { mutate: sendLogInSession, onDone, onError } = useMutation<
    LogInSessionData,
    MutationLoginArgs
  >(LOGINSESSION);

  onDone(({ data }) => {
    logInSessionState.login = '';
    logInSessionState.password = '';

    actions.setSession(true);

    console.log({ data });
  });

  onError(error => {
    logErrorMessages(error);
  });

  const submitLogInSession = () => {
    if (logInSessionState.login !== '' && logInSessionState.password !== '')
      sendLogInSession({ input: logInSessionState });
  };
  return [logInSessionState, submitLogInSession];
};
