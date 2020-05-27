import { UserAttachmentMethodType } from './user.type';

const userAttachmentDocMethods: UserAttachmentMethodType = {
  added: (id: string) => {
    console.log();
    return id + ' ajouté';
  }
};

export default userAttachmentDocMethods;
