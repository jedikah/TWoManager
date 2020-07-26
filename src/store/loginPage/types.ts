export interface ListUser {
  [index: string]: Array<{}>;
}

export interface CurrentUser {
  login: string;
  userId: number;
  userName: string;
  type: string;
  status: boolean;
  iat?: number;
  exp?: number;
}

export interface UserState {
  userById: ListUser;
  userAllIds: Array<string>;
  sessionStatus?: string;
  currentUser: CurrentUser;
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
  goToRoute?: Function;
}
