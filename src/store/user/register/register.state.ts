import { RegisterForm } from './register.types';

export interface RegisterState {
  form: RegisterForm;
}

export const registerState: RegisterState = {
  form: {
    userName: '',
    login: '',
    password: '',
    pdpFile: null
  }
};
