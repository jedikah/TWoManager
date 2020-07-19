import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FactureEntity } from '../database/entities';

@Injectable()
class FactureService {
  constructor(
    @InjectRepository(FactureEntity)
    private factureRepository: Repository<FactureEntity>,
  ) {}

  async findAll(): Promise<FactureEntity[]> {
    return this.factureRepository.find();
  }
}

export default FactureService;
