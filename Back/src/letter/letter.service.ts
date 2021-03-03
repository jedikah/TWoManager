import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from '../folder/folder.entity';
import { Letter } from './letter.entity';

@Injectable()
export class LetterServices {
  constructor(
    @InjectRepository(Letter)
    private LetterRepository: Repository<Letter>,
  ) {}

  async addLetter(letter: Letter): Promise<Letter> {
    return this.LetterRepository.save(letter);
  }

  async getLetterByFolder(folder: Folder): Promise<Letter> {
    return this.LetterRepository.findOne({
      where: { folder },
    });
  }

  async updateLetter(letter: Letter): Promise<Letter> {
    return this.LetterRepository.save(letter);
  }
}
