import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderModule } from '../folder/folder.module';
import { PvFieldResolvers } from './field-resolvers';
import { Pv } from './pv.entity';
import { PvServices } from './pv.service';
import { pvResolvers } from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Pv]), FolderModule],
  providers: [...pvResolvers, PvServices, ...PvFieldResolvers],
  exports: [...pvResolvers, PvServices, ...PvFieldResolvers],
})
export class PvModule {}
