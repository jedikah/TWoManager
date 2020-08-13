import { loginState } from './login/login.state';
import { registerState } from './register/register.state';

export interface ListUser {
  [index: string]: Array<{}>;
}

export interface CurrentUser {
  userId?: number;
  userName: string;
  login: string;
  photo: string;
  type: string;
  status: boolean;
  iat?: number;
  exp?: number;
}

export type formsRouteType = '' | 'CLIENT' | 'FOLDER';

export interface UsersState {
  formsRoute: '' | 'CLIENT' | 'FOLDER';
  formsDrawer: boolean;
  loginState: typeof loginState;
  registerState: typeof registerState;
  session: boolean;
  countDown: number;
  currentUser: CurrentUser;
}
