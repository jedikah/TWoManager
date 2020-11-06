import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from './client.entity';
import { ClientsResolver } from './resolvers';
import { ClientsService } from './clients.service';
import { CollaboratesModule } from '../collaborations/collaborates.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    forwardRef(() => CollaboratesModule),
  ],
  providers: [...ClientsResolver, ClientsService],
  exports: [...ClientsResolver, ClientsService],
})
export class ClientModule {}
