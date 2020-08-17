import { ConnectionOptions } from 'typeorm';

import { ClientEntity } from './clients/client.entity';
import { CollaborateEntity } from './collaborations/collaborate.entity';
import { ConvocationEntity } from './convocations/convocation.entity';
import { FactureEntity } from './factures/facture.entity';
import { FolderEntity } from './folders/folder.entity';
import { LetterEntity } from './letters/letter.entity';
import { PvEntity } from './pvs/pv.entity';
import { UserEntity } from './users/user.entity';

const Entity = [
  ClientEntity,
  CollaborateEntity,
  ConvocationEntity,
  FactureEntity,
  FolderEntity,
  LetterEntity,
  PvEntity,
  UserEntity,
];

export const config: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'twomanager',
  entities: Entity,
  synchronize: true,
};
