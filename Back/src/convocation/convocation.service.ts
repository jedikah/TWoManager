import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
