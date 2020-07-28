import { ActionTree, MutationTree } from 'vuex';

import { UserState, RegisterInput } from '../types';
import RootState from '../../types';
import usersMutate from '../../../client/mutations/users.mutation';

export const registerUsersMutation: MutationTree<UserState> = {};

export const registerUserAction: ActionTree<UserState, RootState> = {
  async register({}, input: RegisterInput) {
    // const output = await usersMutate.register(
    //   input.userName,
    //   input.login,
    //   input.password
    // );
    // console.log({ output });
    // if (output.userId) {
    //   if (output.type)
    //     input.notify({
    //       type: 'positive',
    //       message: 'Création du compte ' + output.type + ' réussit'
    //     });
    //   else {
    //     input.notify({
    //       type: 'positive',
    //       message: 'Création du compte réussit'
    //     });
    //     input.notify({
    //       type: 'positive',
    //       message: 'En attente de validation'
    //     });
    //   }
    // } else {
    //   input.notify({
    //     type: 'negative',
    //     message: 'Créattion de compte échoué!'
    //   });
    // }

    const a = await usersMutate.uploadPdp(input.pdpPath);
    console.log({ a });
  }
};
