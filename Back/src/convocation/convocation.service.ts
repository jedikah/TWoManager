import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Pv } from '../pv/pv.entity';
import { Convocation } from './convocation.entity';

@Injectable()
export class ConvocationServices {
  constructor(
    @InjectRepository(Convocation)
    private convocationRepository: Repository<Convocation>,
  ) {}

  async addConvocation(convocation: Convocation): Promise<Convocation> {
    return this.convocationRepository.save(convocation);
  }

  async updateConvocation(convocation: Convocation): Promise<Convocation> {
    return this.convocationRepository.save(convocation);
  }

  async getConvocationById(id: number): Promise<Convocation> {
    return this.convocationRepository.findOne({ id });
  }

  async getConvocationsByPv(pv: Pv): Promise<Convocation[]> {
    return this.convocationRepository.find({
      where: { pv },
    });
  }
}
