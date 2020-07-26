import { initUsersAction, initUsersMutation } from './initUsers';
import { loginUsersAction, loginUsersMutation } from './loginUsers';
import { registerUserAction, registerUsersMutation } from './registerUsers';

export const loginPageActions = {
  ...initUsersAction,
  ...loginUsersAction,
  ...registerUserAction
};

export const loginPageMutations = {
  ...initUsersMutation,
  ...loginUsersMutation,
  ...registerUsersMutation
};
