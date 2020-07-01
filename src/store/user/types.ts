export interface ListUser {
  [index: string]: Array<{}>;
}

export interface UserState {
  userById: ListUser;
  userAllIds: Array<string>;
  session?: LoginOutput;
  loadingUser?: boolean;
}

export interface LoginInput {
  login: string;
  password: string;
}

export interface LoginOutput {
  IdUser: string;
  name: string;
  login: string;
  password: string;
}

export interface Session {
  IdUser: string;
  name: string;
  login: string;
  password: string;
}
