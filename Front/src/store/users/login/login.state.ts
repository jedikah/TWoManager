import { MutationTree, GetterTree } from 'vuex';

import { UsersState, LoginState, LoginForm } from './login.types';
import RootState from 'src/store/types';

export const loginState: LoginState = {
  form: {
    login: '123456789',
    password: ''
  }
};

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
