import { useMutation } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';
import { reactive, Ref } from '@vue/composition-api';

import { REGISTER, RegisterData } from './useRegister.gql';
import { notifyThere } from '../context';
import { RegisterInput, MutationRegisterArgs } from '../types';
import { usePdpUpload } from './usePdpUpload';
import { MutationUploadFileArgs } from '../types';

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

  onDone(({ errors }) => {
    if (errors) notifyThere(errors);

    registerState.login = null;
    registerState.userName = null;
    registerState.password = null;
    registerState.photo = null;

    if (pdpUploadVar.file) {
      sendPdp();
    }
  });

  onError(({ message }) => {
    logErrorMessages(message);
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

  return [registerState, loading, submit, pdpUploadVar];
};
