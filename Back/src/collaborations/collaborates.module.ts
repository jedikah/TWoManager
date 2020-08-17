import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CollaborateEntity } from './collaborate.entity';
import { ClientModule } from '../clients/clients.module';
import { CollaborationsService } from './collaborations.service';
import { CollaborationsResolvers } from './resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollaborateEntity]),
    forwardRef(() => ClientModule),
  ],
  providers: [...CollaborationsResolvers, CollaborationsService],
  exports: [CollaborationsService],
})
export class CollaboratesModule {}
