import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LetterEntity } from './letter.entity';

@Injectable()
export class LettersService {
  constructor(
    @InjectRepository(LetterEntity)
    private LetterRepository: Repository<LetterEntity>,
  ) {}

  async addLetter(letter: LetterEntity): Promise<LetterEntity> {
    return this.LetterRepository.save(letter);
  }
}
