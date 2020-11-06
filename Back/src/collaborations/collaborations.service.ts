import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { Collaborate } from './collaborate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CollaborationsService {
  constructor(
    @InjectRepository(Collaborate)
    private collaborateRepository: Repository<Collaborate>,
  ) {}

  async paginate(
    qb: SelectQueryBuilder<Collaborate>,
    options: IPaginationOptions,
  ): Promise<Pagination<Collaborate>> {
    return paginate<Collaborate>(qb, options);
  }

  async addCollaboration(collaborate: Collaborate): Promise<Collaborate> {
    return await this.collaborateRepository.save(collaborate);
  }

  getUserClients(userId: number): SelectQueryBuilder<Collaborate> {
    return this.collaborateRepository
      .createQueryBuilder('collaborate')
      .where('collaborate.user_id=:user_id', { user_id: userId })
      .orderBy('collaborate.user_id', 'DESC');
  }

  async count(): Promise<number> {
    return this.collaborateRepository.count();
  }
}
