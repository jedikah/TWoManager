import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

export const config: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'twomanager',
  entities: [path.join(__dirname, 'database/entities/*.entity.js')],
  migrations: [path.join(__dirname, 'database/migrations/*.js')],
  migrationsRun: true,
  cli: {
    migrationsDir: path.join(__dirname, 'database/migrations/*.js'),
  },
  synchronize: false,
};
