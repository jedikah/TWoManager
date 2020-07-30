import { ActionTree, MutationTree } from 'vuex';

import { LoginPageState, RegisterForm } from './register.types';
import RootState from '../../store/types';
import usersMutate from '../../client/mutations/users.mutation';

export const registerUsersMutation: MutationTree<LoginPageState> = {};

export const registerUserAction: ActionTree<LoginPageState, RootState> = {
  async register({}, input: RegisterForm) {
    let photo = null;

    if (await usersMutate.uploadPdp(input.pdpFile, input.login))
      photo = input.login + '/' + input.login + '_pdp.JPG';

    const output = await usersMutate.register(
      input.userName,
      input.login,
      input.password,
      photo
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
    console.log({ input });
  }
};
