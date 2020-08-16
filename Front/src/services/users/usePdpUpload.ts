import { ref, Ref, reactive } from '@vue/composition-api';

import { PDPUPLOAD, PdpUploadData } from 'src/api/users/pdpUpload';
import { MutationUploadFileArgs } from 'src/api/types';
import { useMutation } from '@vue/apollo-composable';

export const usePdpUpload = (): [MutationUploadFileArgs, () => void] => {
  const variable: MutationUploadFileArgs = reactive({
    file: null,
    login: ''
  });

  const { mutate: uploadPdp } = useMutation<
    PdpUploadData,
    MutationUploadFileArgs
  >(PDPUPLOAD, {
    context: {
      hasUpload: true
    }
  });

  const sendPdp = () => {
    if (variable.file && variable.login !== '') uploadPdp(variable);
  };

  return [variable, sendPdp];
};
