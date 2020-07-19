import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PvEntity } from '../database/entities';

@Injectable()
class PvService {
  constructor(
    @InjectRepository(PvEntity)
    private pvRepository: Repository<PvEntity>,
  ) {}

  async findAll(): Promise<PvEntity[]> {
    return this.pvRepository.find();
  }
}

export default PvService;
