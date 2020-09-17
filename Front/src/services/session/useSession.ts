import { reactive } from '@vue/composition-api';

export type CurrentUser = {
  userId: number;
  userName: string;
  login: string;
  photo: string;
  type: string;
  status: boolean;
  iat?: number;
  exp?: number;
};

export interface StateSession {
  session: boolean;
  currentUser: CurrentUser;
}

export const useSession = (): [StateSession] => {
  const state: StateSession = reactive({
    session: false,
    currentUser: {
      userId: null,
      userName: '',
      login: '',
      photo: null,
      type: '',
      status: false
    }
  });

  return [state];
};
