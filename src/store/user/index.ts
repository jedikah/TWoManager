import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';

import RootState from '../types';
import { UserState, RegisterInput, LoginInput } from './types';
import usersQuery from '../../client/queries/users.query';
import usersMutate from '../../client/mutations/users.mutation';

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

  async login({}, input: LoginInput) {
    const { token, type } = await usersQuery.login(input.login, input.password);
    if (token) {
      localStorage.setItem('token', token);
      input.notify({
        type: 'positive',
        message: 'Vous êtes connecté en tant que "' + type + '"'
      });
    } else
      input.notify({
        type: 'negative',
        message: 'Login ou mot de passe incorrect!'
      });
  },

  async register({}, input: RegisterInput) {
    const output = await usersMutate.register(
      input.userName,
      input.login,
      input.password
    );
    console.log({ output });
    if (output.userId) {
      if (output.type)
        input.notify({
          type: 'positive',
          message: 'Création du compte ' + output.type + ' réussit'
        });
      else {
        input.notify({
          type: 'positive',
          message: 'Création du compte réussit'
        });
        input.notify({
          type: 'positive',
          message: 'En attente de validation'
        });
      }
    } else {
      input.notify({
        type: 'negative',
        message: 'Créattion de compte échoué!'
      });
    }
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
