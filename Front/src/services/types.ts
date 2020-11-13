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
  userClients: ClientsCollaborateResult;
  userFolders: FoldersResult;
  users?: Maybe<Array<User>>;
  usersCount: Scalars['Int'];
};


export type QueryUserClientsArgs = {
  paginationInput: PaginationInput;
};


export type QueryUserFoldersArgs = {
  foldersFilterInput: FoldersFilterInput;
  paginationInput: PaginationInput;
};

export type PaginationInput = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
};

export type ClientsCollaborateResult = {
  __typename?: 'ClientsCollaborateResult';
  clients: Array<Client>;
  paginationMeta: PaginationMeta;
};

export type Client = {
  __typename?: 'Client';
  clientId: Scalars['ID'];
  clientName: Scalars['String'];
  contact?: Maybe<Scalars['String']>;
  domicile?: Maybe<Scalars['String']>;
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  currentPage: Scalars['Float'];
  itemCount: Scalars['Float'];
  itemsPerPage: Scalars['Float'];
  totalItems: Scalars['Float'];
  totalPages: Scalars['Float'];
};

export type FoldersFilterInput = {
  groundName?: Maybe<Scalars['String']>;
  numTitle?: Maybe<Scalars['String']>;
  register?: Maybe<Scalars['String']>;
};

export type FoldersResult = {
  __typename?: 'FoldersResult';
  folders: Array<Folder>;
  paginationMeta: PaginationMeta;
};

export type Folder = {
  __typename?: 'Folder';
  client: Client;
  dateTrav: Scalars['DateTime'];
  facture?: Maybe<Facture>;
  fokontany: Scalars['String'];
  folderId: Scalars['ID'];
  groundName: Scalars['String'];
  localisationTrav: Scalars['String'];
  numTitle?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  register: Scalars['String'];
  typeTrav: Scalars['String'];
  user?: Maybe<User>;
};


export type Facture = {
  __typename?: 'Facture';
  dateFacture: Scalars['Float'];
  factureId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  folders: Array<Folder>;
  login: Scalars['String'];
  password: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
  userName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addClientByUser: Client;
  addFolder: Folder;
  addLetter: Letter;
  addPv: Pv;
  checkToken: CheckTokenOutput;
  login: LogInOutput;
  loginSession: Scalars['Boolean'];
  register: UserOutput;
  updateClient: Client;
  updateFolder: Folder;
  updateLetter: Letter;
  uploadFile: Scalars['Boolean'];
};


export type MutationAddClientByUserArgs = {
  input: ClientAddInput;
};


export type MutationAddFolderArgs = {
  input: FolderAddInput;
};


export type MutationAddLetterArgs = {
  input: LetterAddInput;
};


export type MutationAddPvArgs = {
  input: PvAddInput;
};


export type MutationCheckTokenArgs = {
  input: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LogInInput;
};


export type MutationLoginSessionArgs = {
  input: LogInInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateClientArgs = {
  input: ClientUpdateInput;
};


export type MutationUpdateFolderArgs = {
  input: FolderUpdateInput;
};


export type MutationUpdateLetterArgs = {
  input: LetterUpdateInput;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
  login: Scalars['String'];
};

export type ClientAddInput = {
  clientId?: Maybe<Scalars['ID']>;
  clientName: Scalars['String'];
  contact?: Maybe<Scalars['String']>;
  domicile?: Maybe<Scalars['String']>;
};

export type FolderAddInput = {
  clientId: Scalars['Float'];
  dateTrav: Scalars['DateTime'];
  factureId?: Maybe<Scalars['Float']>;
  fokontany: Scalars['String'];
  folderId?: Maybe<Scalars['ID']>;
  groundName: Scalars['String'];
  localisationTrav: Scalars['String'];
  numTitle?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  register: Scalars['String'];
  typeTrav: Scalars['String'];
  userId?: Maybe<Scalars['Float']>;
};

export type LetterAddInput = {
  dateRtx: Scalars['DateTime'];
  folderId: Scalars['Float'];
  id?: Maybe<Scalars['ID']>;
  letterTown: Scalars['String'];
  numRtx: Scalars['String'];
  object: Scalars['String'];
};

export type Letter = {
  __typename?: 'Letter';
  dateRtx: Scalars['DateTime'];
  folder?: Maybe<Folder>;
  id: Scalars['ID'];
  letterTown: Scalars['String'];
  numRtx: Scalars['String'];
  object: Scalars['String'];
};

export type PvAddInput = {
  attachments?: Maybe<Scalars['String']>;
  cause?: Maybe<Scalars['String']>;
  commune?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  folderId: Scalars['Float'];
  region?: Maybe<Scalars['String']>;
};

export type Pv = {
  __typename?: 'Pv';
  attachments: Scalars['String'];
  cause: Scalars['String'];
  commune: Scalars['String'];
  district: Scalars['String'];
  folder?: Maybe<Folder>;
  pvId: Scalars['ID'];
  region: Scalars['String'];
};

export type CheckTokenOutput = {
  __typename?: 'CheckTokenOutput';
  exp: Scalars['Int'];
  iat: Scalars['Int'];
  login: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  status: Scalars['Boolean'];
  type: Scalars['String'];
  userId: Scalars['ID'];
  userName: Scalars['String'];
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

export type RegisterInput = {
  login: Scalars['String'];
  password: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
};

export type UserOutput = {
  __typename?: 'UserOutput';
  login: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
  userName: Scalars['String'];
};

export type ClientUpdateInput = {
  clientId: Scalars['ID'];
  clientName: Scalars['String'];
  contact?: Maybe<Scalars['String']>;
  domicile?: Maybe<Scalars['String']>;
};

export type FolderUpdateInput = {
  clientId: Scalars['Float'];
  dateTrav: Scalars['DateTime'];
  factureId?: Maybe<Scalars['Float']>;
  fokontany: Scalars['String'];
  folderId: Scalars['ID'];
  groundName: Scalars['String'];
  localisationTrav: Scalars['String'];
  numTitle?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  register: Scalars['String'];
  typeTrav: Scalars['String'];
  userId?: Maybe<Scalars['Float']>;
};

export type LetterUpdateInput = {
  dateRtx: Scalars['DateTime'];
  folderId: Scalars['Float'];
  id?: Maybe<Scalars['ID']>;
  letterTown: Scalars['String'];
  numRtx: Scalars['String'];
  object: Scalars['String'];
};

