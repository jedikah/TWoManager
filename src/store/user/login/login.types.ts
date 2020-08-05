export * from '../users.types';

export interface LoginForm {
  login: string;
  password: string;
}

export interface LoginState {
  form: LoginForm;
}
