import { reactive } from 'vue';

import { CheckTokenOutput } from '../types';
import { useCheckToken } from '../users/useCheckToken';

export interface StateSession {
  session?: boolean;
  currentUser: CheckTokenOutput;
  left: boolean;
}

export const initState: StateSession = {
  session: false,
  currentUser: {
    userId: null,
    userName: '',
    login: '',
    photo: null,
    type: '',
    status: false,
    iat: null,
    exp: null,
  },
  left: true,
};

export const state: StateSession = reactive({
  session: false,
  currentUser: {
    userId: null,
    userName: '',
    login: '',
    photo: null,
    type: '',
    status: false,
    iat: null,
    exp: null,
  },
  left: true,
});

export const useSession = () => {
  const { onDone, variables, toMutate } = useCheckToken();

  const checkToken = (token: string) => {
    variables.input = token;

    toMutate();

    onDone(({ data }) => {
      if (data.checkToken) {
        state.session = true;
        state.currentUser = data.checkToken;
      }
    });
  };

  return { state, checkToken, onDone };
};
