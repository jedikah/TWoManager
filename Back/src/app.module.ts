import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { modules } from './repo/modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './ormconfig';
import { ResolverResolver } from './repo/collaborations/resolver/resolver.resolver';
import Entity from './repo/database/entities';

@Module({
  imports: [
    ...modules,
    TypeOrmModule.forFeature(Entity),
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
  providers: [AppService, ResolverResolver],
})
export class AppModule {}
