import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

import Entity from './database/entities';

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
