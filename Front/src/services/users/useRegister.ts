import { useMutation } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';
import { ref, reactive, Ref } from '@vue/composition-api';

import { REGISTER, RegisterData } from 'src/api/users/register';
import { notifyThis } from '../context';
import { RegisterInput, MutationRegisterArgs } from 'src/api/types';
import { usePdpUpload } from './usePdpUpload';
import { MutationUploadFileArgs } from 'src/api/types';

export const useRegister = (): [
  RegisterInput,
  Ref<boolean>,
  () => void,
  MutationUploadFileArgs
] => {
  const registerState: RegisterInput = reactive({
    userName: 'kwan',
    login: 'kwan',
    password: '123',
    photo: null
  });

  const { mutate, onDone, onError, loading } = useMutation<
    RegisterData,
    MutationRegisterArgs
  >(REGISTER);

  const [pdpUploadVar, sendPdp] = usePdpUpload();

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
      if (pdpUploadVar.file) {
        sendPdp();
      }

      mutate({
        input: registerState
      });
    }
  };

  return [registerState, loading, submit, pdpUploadVar];
};
