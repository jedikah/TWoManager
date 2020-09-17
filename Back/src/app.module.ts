/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configs, { config, GraphqlConfigs } from './configs';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auths/auth.module';
import { ClientModule } from './clients/clients.module';
import { CollaboratesModule } from './collaborations/collaborates.module';

import { UtilsModule } from './utils/utils.module';
import { ConnectionOptions } from 'typeorm';

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
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<ConnectionOptions>('database');
      },
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const graphqlConfigs = configService.get<GraphqlConfigs>('graphql');
        return {
          ...graphqlConfigs,
          autoSchemaFile: join(process.cwd(), 'src/types/schema.gql'),
          sortSchema: true,
          context: ({ req }) => ({ req }),
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
