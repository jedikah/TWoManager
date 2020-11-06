import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoldersModule } from '../folders/folders.module';
import { Letter } from './letter.entity';
import { LettersService } from './letters.service';
import { LetterResolvers } from './resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Letter]), FoldersModule],
  providers: [...LetterResolvers, LettersService],
  exports: [...LetterResolvers, LettersService],
})
export class LettersModule {}
