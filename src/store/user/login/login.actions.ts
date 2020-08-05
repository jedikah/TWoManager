import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { Notify } from 'quasar';

import { UsersState, LoginState, LoginForm } from './login.types';
import RootState from 'src/store/types';
import usersQuery from 'src/client/queries/users.query';
import { Router } from 'src/router';

export const loginMutations: MutationTree<UsersState> = {
  reinitLoginState(state) {
    state.loginState.form = { login: '', password: '' };
  },

  setLogin(state: UsersState, login: string) {
    state.loginState.form.login = login;
  },

  setPassword(state: UsersState, password: string) {
    state.loginState.form.password = password;
  }
};

export const loginGetters: GetterTree<UsersState, RootState> = {};

export const loginActions: ActionTree<UsersState, RootState> = {
  async loginSubmit({ commit }, { loginState, passwordState }) {
    const response = await usersQuery.login(loginState, passwordState);

    if (response) {
      const { token, type } = response;
      localStorage.setItem('token', token);
      const currentUser = await usersQuery.checkToken(token);
      Notify.create({
        type: 'positive',
        message: 'Vous êtes connecté en tant que ' + type
      });
      commit('currentUser', currentUser);
      commit('setSession', true);
      commit('reinitLoginState');
      console.log({ currentUser });
      Router.replace('/main');
    }
  },

  async loginSessionSubmit({ commit }, { loginState, passwordState }) {
    commit(
      'setSession',
      await usersQuery.loginSession(loginState, passwordState)
    );
    // commit('reinitLoginState');
  },

  async checkTokenSession({}) {
    const token = localStorage.getItem('token');

    if (token && !(await usersQuery.checkToken(token))) {
      localStorage.removeItem('token');
      Router.replace('/');
    }
    return true;
  }
};
