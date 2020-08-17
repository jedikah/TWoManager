import RootState from '../types';
import {
  StateSession,
  GettersSession,
  MutationsSession,
  ActionsSession,
  ModuleSession
} from './type';

import { checkToken } from 'src/services/users/checkToken';

const state: StateSession = {
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

const getters: GettersSession = {};

const mutations: MutationsSession = {
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser;
  },

  setSession(state, session: typeof state.session) {
    state.session = session;
    console.log({ session: state.session });
  }
};

const actions: ActionsSession = {
  setCurrentUser({ commit }, currentUser) {
    commit('setCurrentUser', currentUser);
  },
  setSession({ commit }, session: typeof state.session) {
    commit('setSession', session);
  }
};

const namespaced = true;

export const sessionModule: ModuleSession = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
