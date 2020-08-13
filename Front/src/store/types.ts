import { UsersState } from './users/users.types';
import { ClientsState } from './clients/clients.types';

export default interface RootState {
  version: string;
  usersState?: UsersState;
  clientState?: ClientsState;
}
