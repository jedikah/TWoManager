import { useMutation } from '@vue/apollo-composable';

import {
  QueryUserClientsArgs,
  MutationAddFolderArgs,
  FolderAddInput
} from '../types';
import { reactive } from '@vue/composition-api';
import { notifyThere, notifyThis, context } from '../context';
import { logErrorMessages } from '@vue/apollo-util';
import { ADDFOLDER, AddFolderData } from './useAddFolder.gql';
import { UserFoldersData, USER_FOLDERS } from './useUserFolders.gql';
import { useSession } from '../session/useSession';

export const useAddFolder = () => {
  const state: FolderAddInput = reactive({
    clientId: null,
    dateTrav: null,
    factureId: null,
    fokontany: 'foko 1',
    folderId: null,
    groundName: 'villa 1',
    localisationTrav: 'local 1',
    numTitle: null,
    price: null,
    register: '0001gk',
    typeTrav: null
  });

  const variables: QueryUserClientsArgs = reactive({
    foldersFilterInput: {
      register: '',
      numTitle: '',
      groundName: ''
    },
    paginationInput: {
      limit: 30,
      page: 1
    }
  });

  const { mutate: senAddClient, onDone, onError } = useMutation<
    AddFolderData,
    MutationAddFolderArgs
  >(ADDFOLDER, {
    context: context(),
    update: (cache, { data }) => {
      if (data?.addFolder) {
        const dataCache = cache.readQuery<
          UserFoldersData,
          QueryUserClientsArgs
        >({
          query: USER_FOLDERS,
          variables
        });
        if (dataCache?.userFolders.folders) {
          dataCache.userFolders.folders.unshift(data.addFolder);
          cache.writeQuery<UserFoldersData>({
            query: USER_FOLDERS,
            data: dataCache
          });
          notifyThis(
            'Client client ' +
              data.addFolder.groundName +
              ' a bien été enregisté.',
            'positive'
          );
        }
      }
    }
  });

  onDone(({ data, errors }) => {
    if (errors) notifyThere(errors);
    // console.log(data);

    notifyThis(
      'Client client ' + data.addFolder.groundName + ' a bien été enregisté.',
      'positive'
    );
  });

  onError(error => {
    console.log(error);
    logErrorMessages(error);
  });

  const submit = () => {
    console.log({ state });
    if (
      state.clientId &&
      state.fokontany &&
      state.groundName &&
      state.localisationTrav &&
      state.register &&
      state.typeTrav
    )
      void senAddClient({ input: state });
  };

  return { state, submit };
};
