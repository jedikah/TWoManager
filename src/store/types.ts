import { UserState } from './user/types';

export default interface RootState {
  version: string;
  user?: UserState;
}
