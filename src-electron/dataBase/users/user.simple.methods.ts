const base64 = require('base64-min');

import {
  UserSimpleMethodType,
  UserSimpleDocument,
  UserAttachmentDocument
} from './user.type';

const userSimpleDocMethods: UserSimpleMethodType = {
  see: function(this: UserSimpleDocument) {
    return {
      IdUser: this.IdUser,
      name: this.name,
      login: this.login,
      password: this.password
    };
  },

  savePDP: async function(this: UserAttachmentDocument, data: string) {
    //'data:image/png;base64,' +
    const pdpinB64 = base64.encodeFile(data);

    const attachment = await this.putAttachment({
      id: this.IdUser + '-' + this.name + '.jpg',
      data: pdpinB64,
      type: 'image/jpeg'
    });

    return attachment.added('piece-jointe:' + this.IdUser + '-' + this.name);
  }
};

export default userSimpleDocMethods;
