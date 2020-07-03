//userDocType, userDocMethods, userCollectionMethods
import * as base64 from 'base64-min';

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
  ) => Promise<{}> | Promise<string>;
  getAllFullDocuments: () => Promise<{
    allUsers: {
      IdUser: string;
      name: string;
      login: string;
      password: string;
    }[];
    length: number;
  }>;
  getAllDocuments: () => Promise<{
    allUsers: {
      IdUser: string;
      name: string;
    }[];
    length: number;
  }>;
  login: (
    login: string,
    password: string
  ) => Promise<{
    IdUser: string;
    name: string;
    login: string;
    password: string;
  } | null>;
  fileUploader: (src: string) => Promise<typeof base64>;
};

type UserSimpleMethodType = {
  see: () => {
    IdUser: string;
    name: string;
    login: string;
    password: string;
  };
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
