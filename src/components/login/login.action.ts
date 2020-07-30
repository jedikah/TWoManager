import { ActionTree, MutationTree } from 'vuex';

import { LoginPageState, CurrentUser, LoginForm } from './login.types';
import RootState from '../../store/types';
import usersQuery from '../../client/queries/users.query';
import { Router } from '../../router';

export const loginUsersMutation: MutationTree<LoginPageState> = {
  setLogin(state: LoginPageState, login: string) {
    state.loginState.form.login = login;
  },
  setPassword(state: LoginPageState, password: string) {
    state.loginState.form.password = password;
  }
};

export const loginUsersAction: ActionTree<LoginPageState, RootState> = {
  setLogin({ commit }, login: string) {
    commit('setLogin', login);
  },
  setPassword({ commit }, password: string) {
    commit('setPassword', password);
  },
  async loginSubmit({}, { login, password, notify }: LoginForm) {
    // console.log({ login });
    const { token, type } = await usersQuery.login(login, password, notify);

    if (token) {
      localStorage.setItem('token', token);
      const checkToken = await usersQuery.checkToken(notify, token);
      notify({
        type: 'positive',
        message: 'Vous êtes connecté en tant que "' + type + '"'
      });

      console.log({ checkToken });
      Router.push({ path: '/main' });
    } else
      notify({
        type: 'negative',
        message: 'Login ou mot de passe incorrect!'
      });
  }
};
