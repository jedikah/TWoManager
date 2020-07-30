export * from 'src/pages/loginPage/loginPage.types.ts';

export interface RegisterForm {
  userName: string;
  login: string;
  password: string;
  pdpFile?: File;
  notify?: Function;
}
