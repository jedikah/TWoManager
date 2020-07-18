import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import title from '../child.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  Logger.log('Server start http://localhost:3000/graphql', 'Bootstap');
  process.send({
    title: title.start_nest_server,
    data: {
      start: 'Server start http://localhost:3000/graphql',
    },
  });
}

bootstrap();
