import { reactive } from 'vue';

import { useMutation } from '@vue/apollo-composable';
import { logErrorMessages } from '@vue/apollo-util';

import { notifyThere, notifyThis } from '../context';
import { MutationAddFolderArgs, QueryUserFoldersArgs } from '../types';
import { ADDFOLDER, AddFolderData } from './useAddFolder.gql';
import { userFoldersvariable } from './useUserFolders';
import { USER_FOLDERS, UserFoldersData } from './useUserFolders.gql';

export const addFoldersArgs = reactive<MutationAddFolderArgs>({
  input: {
    clientId: null,
    dateTrav: null,
    factureId: null,
    fokontany: 'foko 1',
    groundName: 'villa 1',
    localisationTrav: 'local 1',
    numTitle: '',
    price: null,
    register: '0001gk',
    typeTravId: null,
  },
});

export const useAddFolder = () => {
  const { mutate, onDone, onError } = useMutation<
    AddFolderData,
    MutationAddFolderArgs
  >(ADDFOLDER, {
    update: (cache, { data: { addFolder } }) => {
      if (addFolder) {
        const dataCache = cache.readQuery<
          UserFoldersData,
          QueryUserFoldersArgs
        >({
          query: USER_FOLDERS,
          variables: userFoldersvariable,
        });

        cache.writeQuery<UserFoldersData>({
          query: USER_FOLDERS,
          data: dataCache,
        });

        notifyThis({
          message: 'Le dossier enregisté.',
          type: 'positive',
        });
      }
    },
  });

  onDone(({ data, errors }) => {
    if (errors) notifyThere(errors);
    console.log({ data });
  });

  onError((error) => {
    console.log(error);
    logErrorMessages(error);
  });

  const submit = () => {
    if (addFoldersArgs.input.clientId) mutate(addFoldersArgs);
  };

  return { addFoldersArgs, submit };
};
