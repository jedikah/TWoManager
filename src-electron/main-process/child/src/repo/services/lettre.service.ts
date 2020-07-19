import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LetterEntity } from '../database/entities';

@Injectable()
class LettreService {
  constructor(
    @InjectRepository(LetterEntity)
    private letterRepository: Repository<LetterEntity>,
  ) {}

  async findAll(): Promise<LetterEntity[]> {
    return this.letterRepository.find();
  }
}

export default LettreService;
