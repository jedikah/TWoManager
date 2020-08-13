import { MutationTree, GetterTree } from 'vuex';
import { RegisterForm } from './register.types';
import RootState from 'src/store/types';
import { UsersState } from '../login/login.types';

export interface RegisterState {
  form: RegisterForm;
}

export const registerState: RegisterState = {
  form: {
    userName: '',
    login: '',
    password: '',
    pdpFile: null
  }
};

export const registerUsersMutation: MutationTree<UsersState> = {
  reinitResgisterState(state) {
    state.registerState.form = {
      userName: '',
      login: '',
      password: '',
      pdpFile: null
    };
  }
};

export const registerUsersGetter: GetterTree<UsersState, RootState> = {};
