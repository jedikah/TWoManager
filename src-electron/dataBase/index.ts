import { RxDBMigrationPlugin } from 'rxdb/plugins/migration';
import * as RxDB from 'rxdb';
import * as queryBuilder from 'rxdb/plugins/query-builder';
import * as devMod from 'rxdb/plugins/dev-mode';
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
RxDB.addRxPlugin(RxDBValidatePlugin);
RxDB.addRxPlugin(RxDBEncryptionPlugin);
RxDB.addRxPlugin(require('pouchdb-adapter-node-websql'));

const dataBase = async (path: string) => {
  const db: TWoMDatabase = await RxDB.createRxDatabase<TWoMDatabaseCollections>(
    {
      name: path + '/TWoM',
      adapter: 'websql',
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

  const user = db.user.asRxCollection;

  user.preInsert(async function(plainData) {
    const idUsers = (
      await user
        .find()
        .sort('IdUser')
        .exec()
    )
      .reverse()
      .map(user => user.IdUser);
    console.log({ idUsers });
    if (idUsers[0]) plainData.IdUser = (parseInt(idUsers[0]) + 1).toString();
    else plainData.IdUser = '0';
  }, false);

  return db;
};

export default dataBase;
