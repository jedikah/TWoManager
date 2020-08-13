import { ActionTree, MutationTree } from 'vuex';
import { Module, GetterTree } from 'vuex';

import RootState from '../types';
import { ClientsState } from './clients.types';

const state: ClientsState = {
  form: {
    clientName: '',
    domicile: '',
    contact: ''
  }
};

const getters: GetterTree<ClientsState, RootState> = {
  // ...usersGetters
};

const mutations: MutationTree<ClientsState> = {
  // ...usersMutations,
};

const actions: ActionTree<ClientsState, RootState> = {
  // ...usersActions,
  test({ commit }) {
    commit('usersModule/setSession', false, { root: true });
  }
};

const namespaced = true;

export const clientsModule: Module<ClientsState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
