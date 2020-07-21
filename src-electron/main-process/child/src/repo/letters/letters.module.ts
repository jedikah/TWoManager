import { Module } from '@nestjs/common';
import { LettersResolver } from './letters.resolver';
import { LettersService } from './letters.service';

@Module({
  providers: [LettersResolver, LettersService],
  exports: [],
})
export class LetterModule {}
