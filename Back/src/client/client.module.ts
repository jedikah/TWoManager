import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from './client.entity';
import { ClientsResolver } from './resolvers';
import { ClientServices } from './client.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
  ],
  providers: [...ClientsResolver, ClientServices],
  exports: [...ClientsResolver, ClientServices],
})
export class ClientModule {}
