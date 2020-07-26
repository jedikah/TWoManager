import { UserState } from './loginPage/types';

export default interface RootState {
  version: string;
  user?: UserState;
}
