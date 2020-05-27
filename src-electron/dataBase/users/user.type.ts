//userDocType, userDocMethods, userCollectionMethods

import { RxDocument } from 'rxdb';
import { RxCollectionBase } from 'rxdb/dist/types/rx-collection';

type UserSchemaType = {
  IdUser: string;
  name: string;
  login: string;
  password: string;
};

type UserStaticMethodType = {
  createUser: (
    user: { IdUser: string; name: string; login: string; password: string },
    pdp?: string
  ) => Promise<{}>;
  getAllDocuments: () => Promise<{
    length: number;
    all: {
      IdUser: string;
      name: string;
      login: string;
      password: string;
    }[];
  }>;
};

type UserSimpleMethodType = {
  see: () => {};
  savePDP: (data: string) => Promise<string>;
};

type UserAttachmentMethodType = {
  added: (id: string) => string;
};

type UserSimpleDocument = RxDocument<UserSchemaType, UserSimpleMethodType>;

type UserAttachmentDocument = RxDocument<
  UserSchemaType,
  UserAttachmentMethodType
>;

type UserCollection = RxCollectionBase<
  UserSchemaType,
  UserSimpleMethodType,
  UserStaticMethodType
>;

export {
  UserSchemaType,
  UserSimpleMethodType,
  UserStaticMethodType,
  UserAttachmentDocument,
  UserSimpleDocument,
  UserCollection,
  UserAttachmentMethodType
};
