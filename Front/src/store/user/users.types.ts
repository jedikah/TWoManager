import { loginState } from './login/login.state';
import { registerState } from './register/register.state';

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

export interface UsersState {
  loginState: typeof loginState;
  registerState: typeof registerState;
  session: boolean;
  countDown: number;
  currentUser: {
    userId?: number;
    userName: string;
    login: string;
    photo: string;
    type: string;
    status: boolean;
    iat?: number;
    exp?: number;
  };
}
