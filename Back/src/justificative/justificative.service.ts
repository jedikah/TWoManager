import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Pv } from '../pv/pv.entity';
import { Justificative } from './justificative.entity';

@Injectable()
export class JustificativeServices {
  constructor(
    @InjectRepository(Justificative)
    private justificativeRepository: Repository<Justificative>,
  ) {}

  async addJustificative(justificative: Justificative): Promise<Justificative> {
    return this.justificativeRepository.save(justificative);
  }

  async updateJustificative(
    justificative: Justificative,
  ): Promise<Justificative> {
    return this.justificativeRepository.save(justificative);
  }

  async getJustificativeById(id: number): Promise<Justificative> {
    return this.justificativeRepository.findOne({ id });
  }

  async getJustificativeByPv(pv: Pv): Promise<Justificative[]> {
    return this.justificativeRepository.find({ pv });
  }
}
