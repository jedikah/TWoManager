import { ActionTree, MutationTree } from 'vuex';
import { Module, GetterTree } from 'vuex';

import RootState from '../types';
import { UserState } from './types';

import { userState } from './user.state';
import { loginPageActions, loginPageMutations } from './actions_mutations';

const state = userState;

const getters: GetterTree<UserState, RootState> = {
  users(state) {
    return state.userAllIds.map(IdUser => state.userById[IdUser]);
  }
};

const mutations: MutationTree<UserState> = { ...loginPageMutations };

const actions: ActionTree<UserState, RootState> = { ...loginPageActions };

const namespaced = true;

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
