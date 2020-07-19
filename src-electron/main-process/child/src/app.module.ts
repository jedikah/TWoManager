import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import Resolvers from './repo/resolver';
import RepoModule from './repo/repo.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'twomanager',
      migrations: ['src/repo/database/migrations/*.ts'],
      migrationsRun: true,
      autoLoadEntities: true,
    }),
    RepoModule,
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/repo/types/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
