import { useQuasar, Notify } from 'quasar';
import { useMutation } from '@vue/apollo-composable';

import {
  QueryUserClientsArgs,
  MutationAddFolderArgs,
  FolderAddInput
} from '../types';
import { reactive } from 'vue';
import { notifyThere, notifyThis } from '../context';
import { logErrorMessages } from '@vue/apollo-util';
import { ADDFOLDER, AddFolderData } from './useAddFolder.gql';
import { UserFoldersData, USER_FOLDERS } from './useUserFolders.gql';

const state: FolderAddInput = reactive({
  clientId: null,
  dateTrav: null,
  factureId: null,
  fokontany: 'foko 1',
  folderId: null,
  groundName: 'villa 1',
  localisationTrav: 'local 1',
  numTitle: '',
  price: null,
  register: '0001gk',
  typeTrav: null
});

export const useAddFolder = () => {


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

  const { mutate: senAddFolder, onDone, onError } = useMutation<
    AddFolderData,
    MutationAddFolderArgs
  >(ADDFOLDER, {
    update: (cache, { data: {addFolder} }) => {
      if (addFolder) {
        const dataCache = cache.readQuery<UserFoldersData, QueryUserClientsArgs>(
        {
          query: USER_FOLDERS,
          variables
        });

        cache.writeQuery<UserFoldersData>({
          query: USER_FOLDERS,
          data: dataCache
        });

        notifyThis({
          message: 'Client ' +
            addFolder.groundName +
            ' enregisté.',
          type: 'positive'
        });

      }
    }
  });


  onDone(({ data, errors }) => {
    if (errors) notifyThere(errors);
    console.log({data})
  });

  onError(error => {
    console.log(error);
    logErrorMessages(error);
  });

  const submit = () => {
    if (
      state.clientId &&
      state.fokontany &&
      state.groundName &&
      state.localisationTrav &&
      state.register &&
      state.typeTrav
    )
      senAddFolder({ input: state });
  };

  return { state, submit };
};
