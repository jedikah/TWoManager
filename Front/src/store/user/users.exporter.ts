import {
  loginActions,
  loginMutations,
  loginGetters
} from './login/login.actions';

import {
  registerUserAction,
  registerUsersMutation
} from './register/register.actions';

export const usersGetters = {};

export const usersActions = {
  ...loginActions,
  ...registerUserAction
};

export const usersMutations = {
  ...loginMutations,
  ...registerUsersMutation
};
