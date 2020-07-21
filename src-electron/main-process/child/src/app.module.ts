import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepoModule } from './repo/repo.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Entities from './repo/database/entities';

@Module({
  imports: [
    RepoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'twomanager',
      // migrations: ['src/repo/database/migrations/*.ts'],
      // migrationsRun: true,
      autoLoadEntities: true,
      synchronize: false,
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'src/repo/types/schema.gql'),
        playground: true,
        context: ({ req }) => ({ req }),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
