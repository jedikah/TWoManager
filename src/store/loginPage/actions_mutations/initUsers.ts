import { ActionTree, MutationTree } from 'vuex';

import { UserState } from '../types';
import RootState from '../../types';

export const initUsersMutation: MutationTree<UserState> = {
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

export const initUsersAction: ActionTree<UserState, RootState> = {
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
};
