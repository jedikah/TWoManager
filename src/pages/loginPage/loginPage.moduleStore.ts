import { ActionTree, MutationTree } from 'vuex';
import { Module, GetterTree } from 'vuex';

import RootState from '../../store/types';
import { LoginPageState } from './loginPage.types';
import { loginState } from 'src/components/login/login.state';
import { registerState } from 'src/components/register/register.state';

import { loginPageActions, loginPageMutations } from './loginPage.ActionImport';

const state: LoginPageState = {
  loginState,
  registerState,
  test: true
};

const getters: GetterTree<LoginPageState, RootState> = {};

const mutations: MutationTree<LoginPageState> = { ...loginPageMutations };

const actions: ActionTree<LoginPageState, RootState> = { ...loginPageActions };

const namespaced = true;

export const loginPage: Module<LoginPageState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
