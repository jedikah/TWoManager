import { RxDBMigrationPlugin } from 'rxdb/plugins/migration';
import * as RxDB from 'rxdb';
import * as leveldb from 'pouchdb-adapter-leveldb';
import * as queryBuilder from 'rxdb/plugins/query-builder';
import * as devMod from 'rxdb/plugins/dev-mode';
import * as memory from 'pouchdb-adapter-memory';
import { RxDBValidatePlugin } from 'rxdb/plugins/validate';
import { RxDBEncryptionPlugin } from 'rxdb/plugins/encryption';

import {
  userSchema,
  userSimpleDocMethods,
  userStaticMethods,
  userAttachmentDocMethods
} from './users';
import TWoMDatabase, { TWoMDatabaseCollections } from './database.type';

RxDB.addRxPlugin(RxDBMigrationPlugin);
RxDB.addRxPlugin(queryBuilder);
RxDB.addRxPlugin(devMod);
RxDB.addRxPlugin(leveldb);
RxDB.addRxPlugin(memory);
RxDB.addRxPlugin(RxDBValidatePlugin);
RxDB.addRxPlugin(RxDBEncryptionPlugin);

const leveldown = require('leveldown');

const dataBase = async (path: string) => {
  const db: TWoMDatabase = await RxDB.createRxDatabase<TWoMDatabaseCollections>(
    {
      name: path + '/TWoM',
      adapter: leveldown,
      password: '1e@#/246zf4e8g)tr46',
      multiInstance: false,
      ignoreDuplicate: false
    }
  );

  //Ajout de la collection user
  await db.collection({
    name: 'user',
    schema: userSchema,
    statics: userStaticMethods,
    methods: userSimpleDocMethods,
    attachments: userAttachmentDocMethods
  });

  return db;
};

export default dataBase;
