import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from '../client/client.module';
import { TypeTravModule } from '../typeTrav/typeTrav.module';
import { UsersModule } from '../user/user.module';
import { FoldersFielResolver } from './field-resolvers';
import { Folder } from './folder.entity';
import { FolderServices } from './folder.service';
import { FoldersResovers } from './resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Folder]), ClientModule, UsersModule, TypeTravModule],
  providers: [...FoldersResovers, FolderServices, ...FoldersFielResolver],
  exports: [...FoldersResovers, FolderServices, ...FoldersFielResolver],
})
export class FolderModule {}
