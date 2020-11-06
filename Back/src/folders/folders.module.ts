import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from '../clients/clients.module';
import { UsersModule } from '../users/users.module';
import { FoldersFielResolver } from './field-resolvers';
import { Folder } from './folder.entity';
import { FoldersService } from './folders.service';
import { FoldersResovers } from './resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Folder]), ClientModule, UsersModule],
  providers: [...FoldersResovers, FoldersService, ...FoldersFielResolver],
  exports: [...FoldersResovers, FoldersService, ...FoldersFielResolver],
})
export class FoldersModule {}
