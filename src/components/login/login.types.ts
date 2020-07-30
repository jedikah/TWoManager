export * from 'src/pages/loginPage/loginPage.types.ts';

export interface LoginForm {
  login: string;
  password: string;
  notify?: Function;
}
