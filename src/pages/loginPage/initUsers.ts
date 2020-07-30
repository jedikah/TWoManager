import { ActionTree, MutationTree } from 'vuex';

import { LoginPageState } from './loginPage.types';
import RootState from '../../store/types';

export const initUsersMutation: MutationTree<LoginPageState> = {
  setLoading(state, value: boolean) {
    //
  },

  initUsers(state, payloads: LoginPageState) {
    //
  },

  setSession(state, session: string) {
    //
  }
};

export const initUsersAction: ActionTree<LoginPageState, RootState> = {
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
