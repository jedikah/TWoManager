import { reactive } from '@vue/composition-api';
import { useCheckToken } from '../users/useCheckToken';

export type CurrentUser = {
  __typename?: 'CheckTokenOutput';
  userId: string;
  userName: string;
  login: string;
  photo?: string;
  type: string;
  status: boolean;
  iat: number;
  exp: number;
};

export interface StateSession {
  session?: boolean;
  currentUser: CurrentUser;
}

export const state: StateSession = reactive({
  session: undefined,
  currentUser: {
    userId: null,
    userName: '',
    login: '',
    photo: null,
    type: '',
    status: false,
    iat: null,
    exp: null
  },
  left: true
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
