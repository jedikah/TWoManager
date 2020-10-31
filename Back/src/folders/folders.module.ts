import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from '../clients/clients.module';
import { UsersModule } from '../users/users.module';
import { FolderEntity } from './folder.entity';
import { FoldersService } from './folders.service';
import { FoldersResovers } from './resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([FolderEntity]),
    ClientModule,
    UsersModule,
  ],
  providers: [...FoldersResovers, FoldersService],
  exports: [...FoldersResovers, FoldersService],
})
export class FoldersModule {}
