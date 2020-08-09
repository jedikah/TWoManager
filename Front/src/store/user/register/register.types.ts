export * from '../users.types';

export interface RegisterForm {
  userName: string;
  login: string;
  password: string;
  pdpFile?: File | string;
}
