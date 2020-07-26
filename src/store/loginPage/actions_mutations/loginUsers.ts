import { ActionTree, MutationTree } from 'vuex';

import { UserState, CurrentUser, LoginInput } from '../types';
import RootState from '../../types';
import usersQuery from '../../../client/queries/users.query';
import { Router } from '../../../router';

export const loginUsersMutation: MutationTree<UserState> = {
  login(state, payload: CurrentUser) {
    state.currentUser = {
      userId: payload.userId,
      userName: payload.userName,
      login: payload.login,
      type: payload.type,
      status: payload.status
    };
  }
};

export const loginUsersAction: ActionTree<UserState, RootState> = {
  async login({ commit }, input: LoginInput) {
    const { token, type } = await usersQuery.login(
      input.login,
      input.password,
      input.notify
    );

    if (token) {
      localStorage.setItem('token', token);
      const checkToken = await usersQuery.checkToken(input.notify, token);
      input.notify({
        type: 'positive',
        message: 'Vous êtes connecté en tant que "' + type + '"'
      });
      commit('login', checkToken);
      Router.push({ path: '/main' });
    } else
      input.notify({
        type: 'negative',
        message: 'Login ou mot de passe incorrect!'
      });
  }
};
