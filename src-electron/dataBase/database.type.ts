import { UserCollection } from './users/user.type';
import * as RxDB from 'rxdb';

type EotDatabaseCollections = {
  user: UserCollection;
};

type EotDataBase = RxDB.RxDatabase<EotDatabaseCollections>;

export default EotDataBase;
export { EotDatabaseCollections };
