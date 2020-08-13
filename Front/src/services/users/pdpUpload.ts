import graphqlClient from '../index';
import { PDPUPLOAD } from 'src/api/users/pdpUpload';

export const uploadPdp = async (file: {}, login: string) => {
  console.log({ file });
  const response = await graphqlClient.mutate({
    mutation: PDPUPLOAD,
    variables: { file, login },
    context: {
      hasUpload: true
    }
  });
  return response.data.uploadFile;
};
