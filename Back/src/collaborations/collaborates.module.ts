import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CollaborateEntity } from '../database/entities';
import { ClientModule } from '../clients/clients.module';
import { CollaborationsService } from './collaborations.service';
import { ResolverResolver } from './resolver/resolver.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollaborateEntity]),
    forwardRef(() => ClientModule),
  ],
  providers: [ResolverResolver, CollaborationsService],
  exports: [CollaborationsService],
})
export class CollaboratesModule {}
