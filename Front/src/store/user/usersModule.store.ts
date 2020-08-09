import { ActionTree, MutationTree } from 'vuex';
import { Module, GetterTree } from 'vuex';

import RootState from '../types';
import { UsersState } from './users.types';
import { loginState } from './login/login.state';
import { registerState } from './register/register.state';

import { usersActions, usersGetters, usersMutations } from './users.exporter';
import UsersQuery from 'src/client/queries/users.query';

const state: UsersState = {
  loginState,
  registerState,
  countDown: 16,
  session: false,
  currentUser: {
    userId: null,
    userName: '',
    login: '',
    photo: null,
    type: '',
    status: false
  }
};

const getters: GetterTree<UsersState, RootState> = {
  ...usersGetters
};

const mutations: MutationTree<UsersState> = {
  ...usersMutations,

  currentUser(state, currentUser: typeof state.currentUser) {
    state.currentUser = currentUser;
  },

  setSession(state, session: typeof state.session) {
    state.session = session;
  }
};

const actions: ActionTree<UsersState, RootState> = {
  ...usersActions,

  async checkToken({ commit }) {
    const currentUser = await UsersQuery.checkToken();
    console.log({ store: currentUser });
    if (currentUser) {
      commit('currentUser', currentUser);
    }
    return true;
  }
};

const namespaced = true;

export const usersModule: Module<UsersState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
