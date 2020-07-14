import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';

import RootState from '../types';
import { UserState } from './types';

const state: UserState = {
  userById: {},
  userAllIds: [],
  sessionStatus: 'disconnected',
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
  setSession(state, session: string) {
    state.sessionStatus = session;
  }
};

const actions: ActionTree<UserState, RootState> = {
  initUsers({ commit }) {
    commit('');
    // commit('setLoading', true);
    // const users = await UsersQuey.users();
    // commit('initUsers', { userById: users.byId, userAllIds: users.allIds });
    // setTimeout(function() {
    //   commit('setLoading', false);
    // }, 1500);
  },

  setSession({ commit }, session: string) {
    commit('setLoading', true);

    commit('setSession', session);
  }
  // createUser({ commit }, NewUser: )
};

const namespaced = true;

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
