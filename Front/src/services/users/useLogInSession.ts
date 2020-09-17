import { MutationLoginArgs, LogInInput } from 'src/api/types';
import { reactive } from '@vue/composition-api';
import { logErrorMessages } from '@vue/apollo-util';
import { useMutation } from '@vue/apollo-composable';
import { useActions } from '@u3u/vue-hooks';

import { LOGINSESSION, LogInSessionData } from 'src/api/users/loginSession';
import { notifyThere } from '../context';

export const useLogInSession = (): [LogInInput, () => void] => {
  const logInSessionState: LogInInput = reactive({
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

  onDone(({ data, errors }) => {
    if (errors) notifyThere(errors);

    logInSessionState.password = null;

    actions.setSession(data.loginSession);
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
