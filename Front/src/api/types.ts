export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: Date;
  /** The `Upload` scalar type represents a file upload. */
  Upload: Date;
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<UserEntity>>;
  usersCount: Scalars['Int'];
  clientListByUser: Array<ClientEntity>;
  userClients: PaginateUserClients;
};

export type QueryUserClientsArgs = {
  after: Scalars['Float'];
  pageSize: Scalars['Float'];
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
  register: Scalars['String'];
  numTitle: Scalars['String'];
  groundName: Scalars['String'];
  localisationTrav: Scalars['String'];
  fokontany: Scalars['String'];
  dateTrav: Scalars['DateTime'];
  typeTrav: Scalars['String'];
  price: Scalars['Float'];
};

export type ClientEntity = {
  __typename?: 'ClientEntity';
  clientId: Scalars['ID'];
  clientName: Scalars['String'];
  domicile?: Maybe<Scalars['String']>;
  contact?: Maybe<Scalars['String']>;
};

export type PaginateUserClients = {
  __typename?: 'PaginateUserClients';
  countRow: Scalars['Int'];
  hasMore: Scalars['Boolean'];
  cursor: Scalars['Int'];
  clients: Array<ClientEntity>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LogInOutput;
  loginSession: Scalars['Boolean'];
  checkToken: CheckTokenOutput;
  register: UserOutput;
  uploadFile: Scalars['Boolean'];
  addClientByUser: ClientEntity;
};

export type MutationLoginArgs = {
  input: LogInInput;
};

export type MutationLoginSessionArgs = {
  input: LogInInput;
};

export type MutationCheckTokenArgs = {
  input: Scalars['String'];
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationUploadFileArgs = {
  login: Scalars['String'];
  file: Scalars['Upload'];
};

export type MutationAddClientByUserArgs = {
  input: ClientInput;
};

export type LogInInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type LogInOutput = {
  __typename?: 'LogInOutput';
  token?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type CheckTokenOutput = {
  __typename?: 'CheckTokenOutput';
  userId: Scalars['ID'];
  userName: Scalars['String'];
  login: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  status: Scalars['Boolean'];
  iat: Scalars['Int'];
  exp: Scalars['Int'];
};

export type RegisterInput = {
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
