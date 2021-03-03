import { MutationLoginArgs, LogInInput } from '../types';
import { reactive } from 'vue';
import { logErrorMessages } from '@vue/apollo-util';
import { useMutation } from '@vue/apollo-composable';

import { LOGINSESSION, LogInSessionData } from './useLoginSession.gql';
import { notifyThere } from '../context';
import { useSession } from '../session/useSession';

export const useLogInSession = (): [LogInInput, () => void] => {
  const logInSessionState: LogInInput = reactive({
    login: '',
    password: ''
  });

  const { state: sessionState } = useSession();

  const { mutate: sendLogInSession, onDone, onError } = useMutation<
    LogInSessionData,
    MutationLoginArgs
  >(LOGINSESSION);

  onDone(({ data, errors }) => {
    if (errors) notifyThere(errors);

    if (data.loginSession) {
      logInSessionState.password = '';

      sessionState.session = data.loginSession;
    }
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
