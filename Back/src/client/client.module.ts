import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from './client.entity';
import { ClientsResolver } from './resolvers';
import { ClientServices } from './client.service';
import { CollaborateModule } from '../collaborate/collaborate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    forwardRef(() => CollaborateModule),
  ],
  providers: [...ClientsResolver, ClientServices],
  exports: [...ClientsResolver, ClientServices],
})
export class ClientModule {}
