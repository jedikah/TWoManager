export interface ListUser {
  [index: string]: Array<{}>;
}

export interface UserState {
  userById: ListUser;
  userAllIds: Array<string>;
  sessionStatus?: string;
  loadingUser?: boolean;
}

export interface RegisterInput {
  userName: string;
  login: string;
  password: string;
  notify: Function;
}

export interface LoginInput {
  login: string;
  password: string;
  notify: Function;
}
