import { reactive } from '@vue/composition-api';

export interface State {
  authent: AuthentState;
}

export interface AuthentState {
  logIn: LogInState;
  register: RegisterState;
}

export interface LogInState {
  login: string;
  password: string;
}

export interface RegisterState {
  userName: string;
  login: string;
  password: string;
  pdpFile?: File | string;
}

export const logIn: LogInState = reactive({
  login: 'jedikah',
  password: '123'
});

export const register: RegisterState = reactive({
  userName: '',
  login: '',
  password: '',
  pdpFile: null
});

export const state: State = reactive({
  authent: {
    logIn,
    register
  }
});
