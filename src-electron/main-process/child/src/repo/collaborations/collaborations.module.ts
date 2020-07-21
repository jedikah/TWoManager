import { Module } from '@nestjs/common';
import { CollaborationsService } from './collaborations.service';
import { CollaborationsResolver } from './collaborations.resolver';

@Module({
  providers: [CollaborationsService, CollaborationsResolver],
  exports: [],
})
export class CollaborationsModule {}
