import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientEntity } from '../database/entities';
import { ClientsResolver } from './resolvers';
import { ClientsService } from './clients.service';
import { CollaboratesModule } from '../collaborations/collaborates.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),
    forwardRef(() => CollaboratesModule),
  ],
  providers: [...ClientsResolver, ClientsService],
  exports: [...ClientsResolver, ClientsService],
})
export class ClientModule {}
