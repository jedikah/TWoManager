export interface ListUser {
  [index: string]: Array<{}>;
}

export interface UserState {
  userById: ListUser;
  userAllIds: Array<string>;
  sessionStatus?: string;
  loadingUser?: boolean;
}

export interface LoginInput {
  login: string;
  password: string;
}
