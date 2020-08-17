import { useMutation } from '@vue/apollo-composable';
import { reactive, ref, watchEffect } from '@vue/composition-api';

import { CHECKTOKEN, CheckTokenData } from 'src/api/users/checkToken';
import { MutationCheckTokenArgs } from 'src/api/types';
import { logErrorMessages } from '@vue/apollo-util';
import { Router } from 'src/router';
import { FetchResult } from 'apollo-link';

export const useCheckToken = (): [
  (
    fn: (
      param?: FetchResult<
        CheckTokenData,
        Record<string, any>,
        Record<string, any>
      >
    ) => void
  ) => {
    off: () => void;
  },
  {
    input: string;
  },
  () => void
] => {
  const variables = reactive({
    input: ''
  });

  const enabled = ref(false);

  const { onDone, mutate: sendCheckToken, onError } = useMutation<
    CheckTokenData,
    MutationCheckTokenArgs
  >(CHECKTOKEN);

  onError(error => {
    logErrorMessages(error);
    Router.replace('/');
  });

  setTimeout(() => {
    enabled.value = true;
  }, 5000);

  const toMutate = () => {
    enabled.value = true;
    sendCheckToken(variables);
  };

  return [onDone, variables, toMutate];
};
