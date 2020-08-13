import { ActionTree } from 'vuex';
import { Notify } from 'quasar';

import { UsersState } from './login.types';
import RootState from 'src/store/types';

import { logIn } from 'src/services/users/login';
import { loginSession } from 'src/services/users/loginSession';
import { checkToken } from 'src/services/users/checkToken';
import { Router } from 'src/router';

export const loginActions: ActionTree<UsersState, RootState> = {
  async loginSubmit({
    commit,
    state: {
      loginState: {
        form: { login, password }
      }
    }
  }) {
    const response = await logIn(login, password);

    if (response) {
      const { token, type } = response;
      localStorage.setItem('token', token);
      const currentUser = await checkToken(token);
      Notify.create({
        type: 'positive',
        message: 'Vous êtes connecté en tant que ' + type
      });
      commit('setCurrentUser', currentUser);
      commit('setSession', true);
      commit('reinitLoginState');
      console.log({ currentUser });
      Router.replace('/main');
    }
  },

  async loginSessionSubmit({
    commit,
    state: {
      loginState: {
        form: { login, password }
      }
    }
  }) {
    commit('setSession', await loginSession(login, password));
    commit('reinitLoginState');
  },

  async checkTokenSession({}) {
    const token = localStorage.getItem('token');

    if (token && !(await checkToken(token))) {
      localStorage.removeItem('token');
      Router.replace('/');
    }
    return true;
  }
};
