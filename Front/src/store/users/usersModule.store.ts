import { ActionTree, MutationTree } from 'vuex';
import { Module, GetterTree } from 'vuex';

import RootState from '../types';
import { UsersState, formsRouteType } from './users.types';

// LOGIN
import { loginActions } from './login/login.actions';
import { loginState, loginMutations, loginGetters } from './login/login.state';

//REGISTER
import { registerUserAction } from './register/register.actions';
import {
  registerState,
  registerUsersGetter,
  registerUsersMutation
} from './register/register.state';

import { checkToken } from 'src/services/users/checkToken';

const state: UsersState = {
  formsRoute: '',
  formsDrawer: false,
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
  ...loginGetters,
  ...registerUsersGetter
};

const mutations: MutationTree<UsersState> = {
  ...loginMutations,
  ...registerUsersMutation,

  setCurrentUser(state, currentUser: typeof state.currentUser) {
    state.currentUser = currentUser;
  },

  setSession(state, session: typeof state.session) {
    state.session = session;
  },

  setFormsDrawer(state, formsDrawer: boolean) {
    state.formsDrawer = formsDrawer;
  }
};

const actions: ActionTree<UsersState, RootState> = {
  ...loginActions,
  ...registerUserAction,

  async checkToken({ commit }) {
    const currentUser = await checkToken();
    console.log({ store: currentUser });
    if (currentUser) {
      commit('setCurrentUser', currentUser);
    }
    return true;
  },

  setFormsDrawer({ commit }, formsDrawer: boolean) {
    commit('setFormsDrawer', formsDrawer);
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
