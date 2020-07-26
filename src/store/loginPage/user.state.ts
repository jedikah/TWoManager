import { UserState } from './types';

export const userState: UserState = {
  userById: {},
  userAllIds: [],
  sessionStatus: 'disconnected',
  currentUser: {
    userId: null,
    userName: null,
    login: null,
    type: null,
    status: false
  },
  loadingUser: true
};
