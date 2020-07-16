import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import Resolvers from './repos/resolver';
import Services from './repos/services';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/repos/types/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ...Resolvers, ...Services],
})
export class AppModule {}
