import { useMutation } from '@vue/apollo-composable';
import { reactive, ref } from 'vue';

import { CHECKTOKEN, CheckTokenData } from './useCheckToken.gql';
import { MutationCheckTokenArgs } from '../types';
import { logErrorMessages } from '@vue/apollo-util';
import { useRouter } from 'vue-router';
// import { FetchResult } from 'apollo-link';

export const useCheckToken = () => {
  const variables = reactive({
    input: ''
  });

  const enabled = ref(false);
  const router = useRouter();

  const { onDone, mutate: sendCheckToken, onError } = useMutation<
    CheckTokenData,
    MutationCheckTokenArgs
  >(CHECKTOKEN);

  onError(error => {
    logErrorMessages(error);
    router.replace('/');
  });

  setTimeout(() => {
    enabled.value = true;
  }, 500);

  const toMutate = () => {
    enabled.value = true;
    sendCheckToken(variables);
  };

  return { onDone, variables, toMutate };
};
