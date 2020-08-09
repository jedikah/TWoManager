import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import title from '../child.constant';
import { createConnection } from 'typeorm';
import { config } from './ormconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  Logger.log('Server start http://localhost:3000/graphql', 'Bootstap');
  process.send({
    title: title.StartNestServer,
    data: {
      start: 'Server start http://localhost:3000/graphql',
    },
  });
}

(async () => {
  try {
    console.log('*** Connection à la base de donné ***');
    const connection = await createConnection({ name: 'migration', ...config });
    const isConnected = await connection.isConnected;
    if (isConnected) {
      console.log('*** Connection etablie ***');
      console.log('*** verification des migrations ***');
      await connection.runMigrations();
      console.log('*** Verifivation terminé ***');
      console.log('*** Lancement du serveur server ***');
      await bootstrap();
    } else
      console.log(
        '*** Connection échoue, verifier voter serveur de base de données !!! ***',
      );
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
})();
