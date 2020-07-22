import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepoModule } from './repo/repo.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './ormconfig';

@Module({
  imports: [
    RepoModule,
    TypeOrmModule.forRoot({ autoLoadEntities: true, ...config }),
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
