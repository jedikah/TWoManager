import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type Cause = {
  __typename?: 'Cause';
  domicile?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  numero: Scalars['Float'];
  pv?: Maybe<Pv>;
  role?: Maybe<Scalars['String']>;
};

export type CauseAddInput = {
  domicile?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  numero: Scalars['Float'];
  pvId: Scalars['Float'];
  role?: Maybe<Scalars['String']>;
};

export type CauseByPvInput = {
  pvId: Scalars['Float'];
};

export type CauseUpdateInput = {
  domicile?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  numero: Scalars['Float'];
  pvId: Scalars['Float'];
  role?: Maybe<Scalars['String']>;
};

export type CheckTokenOutput = {
  __typename?: 'CheckTokenOutput';
  exp: Scalars['Int'];
  iat: Scalars['Int'];
  login: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  status: Scalars['Boolean'];
  type: Scalars['String'];
  userId: Scalars['Float'];
  userName: Scalars['String'];
};

export type Client = {
  __typename?: 'Client';
  contact?: Maybe<Scalars['String']>;
  domicile?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  user: User;
};

export type ClientAddInput = {
  contact?: Maybe<Scalars['String']>;
  domicile?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
};

export type ClientUpdateInput = {
  contact?: Maybe<Scalars['String']>;
  domicile?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type ClientsFilterInput = {
  contact?: Maybe<Scalars['String']>;
  domicile?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ClientsResult = {
  __typename?: 'ClientsResult';
  clients: Array<Client>;
  paginationMeta: PaginationMeta;
};

export type ClientsSearchFilterInput = {
  limit?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
};

export type Convocation = {
  __typename?: 'Convocation';
  atTown: Scalars['String'];
  convokeOn: Scalars['DateTime'];
  id: Scalars['Float'];
  model?: Maybe<Model>;
  namePersConv: Scalars['String'];
  numRegister: Scalars['Float'];
  numRequisition: Scalars['String'];
  pv?: Maybe<Pv>;
};

export type ConvocationAddInput = {
  atTown?: Maybe<Scalars['String']>;
  convokeOn: Scalars['DateTime'];
  modelId?: Maybe<Scalars['Float']>;
  namePersConv: Scalars['String'];
  numRegister: Scalars['Float'];
  numRequisition?: Maybe<Scalars['String']>;
  pvId: Scalars['Float'];
};

export type ConvocationFilterInput = {
  pvId: Scalars['Float'];
};

export type ConvocationUpdateInput = {
  atTown?: Maybe<Scalars['String']>;
  convokeOn: Scalars['DateTime'];
  id: Scalars['Float'];
  modelId?: Maybe<Scalars['Float']>;
  namePersConv: Scalars['String'];
  numRegister: Scalars['Float'];
  numRequisition?: Maybe<Scalars['String']>;
  pvId: Scalars['Float'];
};


export type Facture = {
  __typename?: 'Facture';
  dateFacture: Scalars['Float'];
  id: Scalars['Float'];
};

export type Folder = {
  __typename?: 'Folder';
  client: Client;
  dateTrav: Scalars['DateTime'];
  facture?: Maybe<Facture>;
  fokontany: Scalars['String'];
  groundName: Scalars['String'];
  id: Scalars['Float'];
  localisationTrav: Scalars['String'];
  numTitle?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  register: Scalars['String'];
  typeTrav?: Maybe<TypeTrav>;
  user?: Maybe<User>;
};

export type FolderAddInput = {
  clientId: Scalars['Float'];
  dateTrav?: Maybe<Scalars['DateTime']>;
  factureId?: Maybe<Scalars['Float']>;
  fokontany?: Maybe<Scalars['String']>;
  groundName?: Maybe<Scalars['String']>;
  localisationTrav?: Maybe<Scalars['String']>;
  numTitle?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  register?: Maybe<Scalars['String']>;
  typeTravId?: Maybe<Scalars['Float']>;
};

export type FolderUpdateInput = {
  clientId?: Maybe<Scalars['Float']>;
  dateTrav: Scalars['DateTime'];
  factureId?: Maybe<Scalars['Float']>;
  fokontany?: Maybe<Scalars['String']>;
  folderId: Scalars['Float'];
  groundName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  localisationTrav?: Maybe<Scalars['String']>;
  numTitle?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  register?: Maybe<Scalars['String']>;
  typeTravId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
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

export type Justificative = {
  __typename?: 'Justificative';
  content: Scalars['String'];
  id: Scalars['Float'];
  numero: Scalars['Float'];
  pv: Pv;
};

export type JustificativeAddInput = {
  content?: Maybe<Scalars['String']>;
  numero: Scalars['Float'];
  pvId: Scalars['Float'];
};

export type JustificativeByPvInput = {
  pvId: Scalars['Float'];
};

export type JustificativeUpdateInput = {
  content?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  numero: Scalars['Float'];
  pvId: Scalars['Float'];
};

export type Letter = {
  __typename?: 'Letter';
  dateRtx: Scalars['DateTime'];
  folder?: Maybe<Folder>;
  id: Scalars['Float'];
  letterTown: Scalars['String'];
  model?: Maybe<Folder>;
  numRtx: Scalars['String'];
  object: Scalars['String'];
};

export type LetterAddInput = {
  dateRtx: Scalars['DateTime'];
  folderId: Scalars['Float'];
  id?: Maybe<Scalars['Float']>;
  letterTown: Scalars['String'];
  numRtx: Scalars['String'];
  object: Scalars['String'];
};

export type LetterUpdateInput = {
  dateRtx: Scalars['DateTime'];
  folderId: Scalars['Float'];
  id?: Maybe<Scalars['Float']>;
  letterTown: Scalars['String'];
  numRtx: Scalars['String'];
  object: Scalars['String'];
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

export type Model = {
  __typename?: 'Model';
  content?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  label: Scalars['String'];
  name: Scalars['String'];
};

export type ModelAddInput = {
  content?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ModelFilterInput = {
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ModelUpdateInput = {
  content?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCause: Cause;
  addClient: Client;
  addConvocation: Convocation;
  addFolder: Folder;
  addJustificative: Justificative;
  addLetter: Letter;
  addModel: Model;
  addPv: Pv;
  addTypeTrav: TypeTrav;
  checkToken: CheckTokenOutput;
  login: LogInOutput;
  loginSession: Scalars['Boolean'];
  register: UserOutput;
  updateCause: Cause;
  updateClient: Client;
  updateConvocation: Convocation;
  updateFolder: Folder;
  updateJustificative: Justificative;
  updateLetter: Letter;
  updateModel: Model;
  updatePv: Pv;
  updateTypeTrav: TypeTrav;
  uploadFile: Scalars['Boolean'];
};


export type MutationAddCauseArgs = {
  input: CauseAddInput;
};


export type MutationAddClientArgs = {
  input: ClientAddInput;
};


export type MutationAddConvocationArgs = {
  input: ConvocationAddInput;
};


export type MutationAddFolderArgs = {
  input: FolderAddInput;
};


export type MutationAddJustificativeArgs = {
  input: JustificativeAddInput;
};


export type MutationAddLetterArgs = {
  input: LetterAddInput;
};


export type MutationAddModelArgs = {
  input: ModelAddInput;
};


export type MutationAddPvArgs = {
  input: PvAddInput;
};


export type MutationAddTypeTravArgs = {
  input: TypeTravAddInput;
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


export type MutationUpdateCauseArgs = {
  input: CauseUpdateInput;
};


export type MutationUpdateClientArgs = {
  input: ClientUpdateInput;
};


export type MutationUpdateConvocationArgs = {
  input: ConvocationUpdateInput;
};


export type MutationUpdateFolderArgs = {
  input: FolderUpdateInput;
};


export type MutationUpdateJustificativeArgs = {
  input: JustificativeUpdateInput;
};


export type MutationUpdateLetterArgs = {
  input: LetterUpdateInput;
};


export type MutationUpdateModelArgs = {
  input: ModelUpdateInput;
};


export type MutationUpdatePvArgs = {
  input: PvUpdateInput;
};


export type MutationUpdateTypeTravArgs = {
  input: TypeTravUpdateInput;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
  login: Scalars['String'];
};

export type PaginationInput = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  currentPage: Scalars['Float'];
  itemCount: Scalars['Float'];
  itemsPerPage: Scalars['Float'];
  totalItems: Scalars['Float'];
  totalPages: Scalars['Float'];
};

export type Pv = {
  __typename?: 'Pv';
  commune?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  folder?: Maybe<Folder>;
  id: Scalars['Float'];
  pvMere?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
};

export type PvAddInput = {
  commune?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  folderId?: Maybe<Scalars['Float']>;
  pvMere?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
};

export type PvByFolderInput = {
  folderId: Scalars['Float'];
};

export type PvUpdateInput = {
  commune?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  folderId?: Maybe<Scalars['Float']>;
  id: Scalars['Float'];
  pvMere?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  causeByPv: Array<Cause>;
  clients: ClientsResult;
  clientsSearch: Array<Client>;
  convocationsByPv: Array<Convocation>;
  justificativeByPv: Array<Justificative>;
  models: Array<Model>;
  pvByFolder: Pv;
  typeTravs: Array<TypeTrav>;
  userFolders: FoldersResult;
  users?: Maybe<Array<User>>;
  usersCount: Scalars['Int'];
};


export type QueryCauseByPvArgs = {
  input: CauseByPvInput;
};


export type QueryClientsArgs = {
  filter: ClientsFilterInput;
  pagination: PaginationInput;
};


export type QueryClientsSearchArgs = {
  filter: ClientsSearchFilterInput;
};


export type QueryConvocationsByPvArgs = {
  input: ConvocationFilterInput;
};


export type QueryJustificativeByPvArgs = {
  input: JustificativeByPvInput;
};


export type QueryModelsArgs = {
  input: ModelFilterInput;
};


export type QueryPvByFolderArgs = {
  input: PvByFolderInput;
};


export type QueryUserFoldersArgs = {
  filter: FoldersFilterInput;
  pagination: PaginationInput;
};

export type RegisterInput = {
  login: Scalars['String'];
  password: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
};

export type TypeTrav = {
  __typename?: 'TypeTrav';
  id: Scalars['Float'];
  label: Scalars['String'];
  model?: Maybe<Model>;
};

export type TypeTravAddInput = {
  label: Scalars['String'];
  modelId?: Maybe<Scalars['Float']>;
};

export type TypeTravUpdateInput = {
  id: Scalars['Float'];
  label: Scalars['String'];
  modelId?: Maybe<Scalars['Float']>;
};


export type User = {
  __typename?: 'User';
  folders: Array<Folder>;
  login: Scalars['String'];
  password: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  userId: Scalars['Float'];
  userName: Scalars['String'];
};

export type UserOutput = {
  __typename?: 'UserOutput';
  login: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  userId: Scalars['Float'];
  userName: Scalars['String'];
};
