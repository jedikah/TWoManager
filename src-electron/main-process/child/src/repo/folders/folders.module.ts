import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersResolver } from './folders.resolver';

@Module({
  providers: [FoldersService, FoldersResolver],
  exports: [],
})
export class FoldersModule {}
