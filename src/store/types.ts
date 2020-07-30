import { LoginPageState } from '../pages/loginPage/loginPage.types';

export default interface RootState {
  version: string;
  loginPage?: LoginPageState;
}
