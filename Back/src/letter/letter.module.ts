import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderModule } from '../folder/folder.module';
import { Letter } from './letter.entity';
import { LetterServices } from './letter.service';
import { LetterResolvers } from './resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Letter]), FolderModule],
  providers: [...LetterResolvers, LetterServices],
  exports: [...LetterResolvers, LetterServices],
})
export class LetterModule {}
