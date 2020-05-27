import { UserCollection } from './users/user.type';
import * as RxDB from 'rxdb';

type TWoMDatabaseCollections = {
  user: UserCollection;
};

type TWoMDataBase = RxDB.RxDatabase<TWoMDatabaseCollections>;

export default TWoMDataBase;
export { TWoMDatabaseCollections };
