import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import title from '../child.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  Logger.log(
    'Server start http://localhost:' + process.env.PORT + '/graphql',
    'Bootstap',
  );

  if (process.send)
    process.send({
      title: title.StartNestServer,
      data: {
        start: 'Server start http://localhost:' + process.env.PORT + '/graphql',
      },
    });
}

console.log('*** verification des migrations ***');
bootstrap();
