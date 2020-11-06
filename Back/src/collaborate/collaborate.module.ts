import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Collaborate } from './collaborate.entity';
import { ClientModule } from '../client/client.module';
import { CollaborationServices } from './collaborate.service';
import { CollaborationsResolvers } from './resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collaborate]),
    forwardRef(() => ClientModule),
  ],
  providers: [...CollaborationsResolvers, CollaborationServices],
  exports: [CollaborationServices],
})
export class CollaborateModule {}
