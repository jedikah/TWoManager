import { ActionTree } from 'vuex';
import { Notify } from 'quasar';

import { UsersState } from './register.types';
import RootState from 'src/store/types';

import { register } from 'src/services/users/register';
import { uploadPdp } from 'src/services/users/pdpUpload';

export const registerUserAction: ActionTree<UsersState, RootState> = {
  async register({
    state: {
      registerState: {
        form: { login, userName, password, pdpFile }
      }
    }
  }) {
    let photo = null;

    if (await uploadPdp(pdpFile, login))
      photo = login + '/' + login + '_pdp.JPG';

    const output = await register(userName, login, password, photo);

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
