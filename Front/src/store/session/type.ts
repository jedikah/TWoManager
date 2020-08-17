import { Module, GetterTree, MutationTree, ActionTree } from 'vuex';
import RootState from '../types';

export type CurrentUser = {
  userId: number;
  userName: string;
  login: string;
  photo: string;
  type: string;
  status: boolean;
  iat?: number;
  exp?: number;
};

export interface StateSession {
  session: boolean;
  currentUser: CurrentUser;
}

export type GettersSession = GetterTree<StateSession, RootState>;

export interface MutationsSession extends MutationTree<StateSession> {
  setCurrentUser: (state, currentUser: CurrentUser) => void;
  setSession: (state, session: boolean) => void;
}
export interface ActionsSession extends ActionTree<StateSession, RootState> {
  setCurrentUser: ({ commit }, currentUser: CurrentUser) => void;
  setSession: ({ commit }, session: boolean) => void;
}

export interface ModuleSession extends Module<StateSession, RootState> {
  namespaced: boolean;
  state: StateSession;
  getters: GettersSession;
  mutations: MutationsSession;
  actions: ActionsSession;
}
