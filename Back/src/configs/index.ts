import { ConnectionOptions } from 'typeorm';

import { ClientEntity } from '../clients/client.entity';
import { CollaborateEntity } from '../collaborations/collaborate.entity';
import { ConvocationEntity } from '../convocations/convocation.entity';
import { FactureEntity } from '../factures/facture.entity';
import { FolderEntity } from '../folders/folder.entity';
import { LetterEntity } from '../letters/letter.entity';
import { PvEntity } from '../pvs/pv.entity';
import { UserEntity } from '../users/user.entity';

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

export interface GraphqlConfigs {
  playground: boolean;
  debug: boolean;
}
export interface ServerConfigs {
  port: number;
}

export interface Configs {
  server: ServerConfigs;
  graphql: GraphqlConfigs;
  database: ConnectionOptions;
}

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

export default (): Configs => {
  return {
    server: {
      port: parseInt(process.env.PORT),
    },
    graphql: {
      playground: process.env.PLAYGROUND === 'true',
      debug: process.env.DEBUG === 'true',
    },
    database: {
      type: 'mysql',
      name: 'default',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: ['src/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrations: ['src/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations_typeorm',
      migrationsRun: true,
    },
  };
};
