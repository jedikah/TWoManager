import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import RepoModule from './repos';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/repos/types/schema.gql'),
    }),
    ...RepoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
