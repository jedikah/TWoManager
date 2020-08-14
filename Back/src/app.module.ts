import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './ormconfig';
import Entity from './database/entities';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auths/auth.module';
import { ClientModule } from './clients/clients.module';
import { CollaboratesModule } from './collaborations/collaborates.module';

import { UtilsModule } from './utils/utils.module';

const modules = [
  UtilsModule,
  UsersModule,
  AuthModule,
  ClientModule,
  CollaboratesModule,
];

@Module({
  imports: [
    ...modules,
    // TypeOrmModule.forFeature(Entity),
    TypeOrmModule.forRoot(config),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'src/types/schema.gql'),
        playground: true,
        context: ({ req }) => ({ req }),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
