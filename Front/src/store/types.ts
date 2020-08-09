import { UsersState } from './user/users.types';

export default interface RootState {
  version: string;
  usersState?: UsersState;
}
