import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  login: LoginOutput;
  loginSession: Scalars['Boolean'];
  checkToken: VerifyToken;
  users?: Maybe<Array<UserEntity>>;
  usersCount: Scalars['Int'];
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryLoginSessionArgs = {
  input: LoginInput;
};


export type QueryCheckTokenArgs = {
  input: Scalars['String'];
};

export type LoginInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  token?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type VerifyToken = {
  __typename?: 'VerifyToken';
  userId: Scalars['ID'];
  userName: Scalars['String'];
  login: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  status: Scalars['Boolean'];
  iat: Scalars['Int'];
  exp: Scalars['Int'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  userId: Scalars['ID'];
  userName: Scalars['String'];
  login: Scalars['String'];
  password: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  folders: Array<FolderEntity>;
};

export type FolderEntity = {
  __typename?: 'FolderEntity';
  folderId: Scalars['ID'];
  userId: Scalars['Float'];
  clientId: Scalars['Float'];
  factureId: Scalars['Float'];
  register: Scalars['String'];
  numTitle: Scalars['String'];
  groundName: Scalars['String'];
  localisationTrav: Scalars['String'];
  fokontany: Scalars['String'];
  dateTrav: Scalars['DateTime'];
  typeTrav: Scalars['String'];
  price: Scalars['Float'];
};


export type Mutation = {
  __typename?: 'Mutation';
  register: UserOutput;
  uploadFile: Scalars['Boolean'];
  addClientByUser: ClientEntity;
};


export type MutationRegisterArgs = {
  input: UserInput;
};


export type MutationUploadFileArgs = {
  login: Scalars['String'];
  file: Scalars['Upload'];
};


export type MutationAddClientByUserArgs = {
  input: ClientInput;
};

export type UserInput = {
  userName: Scalars['String'];
  login: Scalars['String'];
  password: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
};

export type UserOutput = {
  __typename?: 'UserOutput';
  userId: Scalars['ID'];
  userName: Scalars['String'];
  login: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};


export type ClientInput = {
  clientId?: Maybe<Scalars['ID']>;
  clientName: Scalars['String'];
  domicile?: Maybe<Scalars['String']>;
  contact?: Maybe<Scalars['String']>;
};

export type ClientEntity = {
  __typename?: 'ClientEntity';
  clientId: Scalars['ID'];
  clientName: Scalars['String'];
  domicile?: Maybe<Scalars['String']>;
  contact?: Maybe<Scalars['String']>;
};


