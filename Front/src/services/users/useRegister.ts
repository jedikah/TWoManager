import { useMutation } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';
import { ref, reactive, Ref } from '@vue/composition-api';

import { REGISTER } from 'src/api/users/register';
import { notifyThis } from '../context';
import { RegisterInput } from 'src/api/types';

export const useRegister = (): [RegisterInput, Ref<boolean>, () => void] => {
  const registerState: RegisterInput = reactive({
    userName: '',
    login: '',
    password: '',
    photo: null
  });

  const { mutate, onDone, onError, loading } = useMutation(REGISTER);

  onDone(({ data }) => {
    registerState.login = '';
    registerState.userName = '';
    registerState.password = '';
    registerState.photo = null;

    console.log({ data });
  });

  onError(error => {
    notifyThis(error.message);
  });

  const submit = () => {
    if (
      registerState.login !== '' &&
      registerState.userName !== '' &&
      registerState.password !== ''
    ) {
      mutate({
        input: registerState
      });
    }
  };

  return [registerState, loading, submit];
};
