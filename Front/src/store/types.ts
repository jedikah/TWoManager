import { UsersState } from './users/users.types';
import { ClientsState } from './clients/clients.types';
import { SessionState } from './session/sessionModule.store';

export default interface RootState {
  version: string;
  usersState?: UsersState;
  clientState?: ClientsState;
  sessionState?: SessionState;
}
