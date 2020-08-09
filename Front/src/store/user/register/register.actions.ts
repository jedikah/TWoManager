import { ActionTree, MutationTree } from 'vuex';
import { Notify } from 'quasar';

import { UsersState, RegisterForm } from './register.types';
import RootState from 'src/store/types';
import usersMutate from 'src/client/mutations/users.mutation';

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

export const registerUserAction: ActionTree<UsersState, RootState> = {
  async register(
    { commit },
    { login, userName, password, pdpFile }: RegisterForm
  ) {
    let photo = null;

    if (await usersMutate.uploadPdp(pdpFile, login))
      photo = login + '/' + login + '_pdp.JPG';

    const output = await usersMutate.register(userName, login, password, photo);

    if (output.userId) {
      if (output.type)
        Notify.create({
          type: 'positive',
          message: 'Création du compte ' + output.type + ' réussit'
        });
      else {
        Notify.create({
          type: 'positive',
          message: 'Création du compte réussit'
        });
        Notify.create({
          type: 'positive',
          message: 'En attente de validation'
        });
      }
    } else {
      Notify.create({
        type: 'negative',
        message: 'Créattion de compte échoué!'
      });
    }
    this.commit('reinitResgisterState');
  }
};
