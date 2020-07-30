import { loginState } from 'src/components/login/login.state';
import { registerState } from 'src/components/register/register.state';

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

export interface LoginPageState {
  loginState: typeof loginState;
  registerState: typeof registerState;
  test: boolean;
}
