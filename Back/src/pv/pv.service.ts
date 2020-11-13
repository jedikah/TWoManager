import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pv } from './pv.entity';

@Injectable()
export class PvServices {
  constructor(
    @InjectRepository(Pv)
    private pvRepository: Repository<Pv>,
  ) {}

  async addPv(pv: Pv): Promise<Pv> {
    return this.pvRepository.save(pv);
  }
}
