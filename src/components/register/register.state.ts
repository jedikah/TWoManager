import { RegisterForm } from './register.types';

export const registerState: {
  form: RegisterForm;
} = {
  form: {
    userName: '',
    login: '',
    password: '',
    pdpFile: null,
    notify: null
  }
};
