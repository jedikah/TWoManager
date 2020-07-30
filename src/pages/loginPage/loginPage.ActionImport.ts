import { initUsersAction, initUsersMutation } from './initUsers';
import {
  loginUsersAction,
  loginUsersMutation
} from '../../components/login/login.action';
import {
  registerUserAction,
  registerUsersMutation
} from '../../components/register/register.action';

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
