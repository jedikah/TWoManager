import { ConnectionOptions } from 'typeorm';
const path = require('path');

export const config: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'twomanager',
  entities: [path.join(__dirname + 'repo/database/entities/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'repo/database/migrations/*{.ts, .js}')],
  migrationsRun: true,
  cli: {
    migrationsDir: path.join(__dirname, 'repo/database/migrations/*{.ts, .js}'),
  },
  synchronize: false,
};
