import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';

import RootState from '../types';
import { UserState, LoginInput, LoginOutput } from './types';
import UsersQuey from '../../models/query/user';

const state: UserState = {
  userById: {},
  userAllIds: [],
  session: { IdUser: null, name: null, login: null, password: null },
  loadingUser: true
};

const getters: GetterTree<UserState, RootState> = {
  users(state) {
    return state.userAllIds.map(IdUser => state.userById[IdUser]);
  }
};

const mutations: MutationTree<UserState> = {
  setLoading(state, value: boolean) {
    state.loadingUser = value;
  },
  initUsers(state, payloads: UserState) {
    state.userAllIds = payloads.userAllIds;
    state.userById = payloads.userById;
  },
  loginAct(state, payloads: LoginOutput) {
    state.session = {
      IdUser: payloads.IdUser,
      name: payloads.name,
      login: payloads.login,
      password: payloads.password
    };
  }
};

const actions: ActionTree<UserState, RootState> = {
  async initUsers({ commit }) {
    commit('setLoading', true);
    const users = await UsersQuey.users();
    commit('initUsers', { userById: users.byId, userAllIds: users.allIds });
    setTimeout(function() {
      commit('setLoading', false);
    }, 1500);
  },

  async loginAct({ commit }, loginInput: LoginInput): Promise<void> {
    commit('setLoading', true);
    const loginOutput = await UsersQuey.login(
      loginInput.login,
      loginInput.password
    );

    commit('loginAct', loginOutput);
  }
};

const namespaced = true;

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
