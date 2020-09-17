import { StateSession } from './session/type';

export default interface RootState {
  version: string;
  sessionState?: StateSession;
}
