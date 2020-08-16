import { ActionTree, MutationTree } from 'vuex';
import { Module, GetterTree } from 'vuex';

import RootState from '../types';

import { checkToken } from 'src/services/users/checkToken';

export interface SessionState {
  session: boolean;
  currentUser: {
    userId: number;
    userName: string;
    login: string;
    photo: string;
    type: string;
    status: boolean;
  };
}

const state: SessionState = {
  session: true,
  currentUser: {
    userId: null,
    userName: '',
    login: '',
    photo: null,
    type: '',
    status: false
  }
};

const getters: GetterTree<SessionState, RootState> = {};

const mutations: MutationTree<SessionState> = {
  setCurrentUser(state, currentUser: typeof state.currentUser) {
    state.currentUser = currentUser;
  },

  setSession(state, session: typeof state.session) {
    state.session = session;
  }
};

const actions: ActionTree<SessionState, RootState> = {
  setCurrentUser({ commit }, currentUser: typeof state.currentUser) {
    commit('setCurrentUser', currentUser);
  },
  setSession({ commit }, session: typeof state.session) {
    commit('setSession', session);
  }
};

const namespaced = true;

export const sessionModule: Module<SessionState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
