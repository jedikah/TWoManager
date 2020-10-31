import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { CollaborateEntity } from './collaborate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CollaborationsService {
  constructor(
    @InjectRepository(CollaborateEntity)
    private collaborateRepository: Repository<CollaborateEntity>,
  ) {}

  async paginate(
    qb: SelectQueryBuilder<CollaborateEntity>,
    options: IPaginationOptions,
  ): Promise<Pagination<CollaborateEntity>> {
    return paginate<CollaborateEntity>(qb, options);
  }

  async addCollaboration(
    collaborate: CollaborateEntity,
  ): Promise<CollaborateEntity> {
    return await this.collaborateRepository.save(collaborate);
  }

  getUserClients(userId: number): SelectQueryBuilder<CollaborateEntity> {
    return this.collaborateRepository
      .createQueryBuilder('collaborate')
      .where('collaborate.user_id=:user_id', { user_id: userId })
      .orderBy('collaborate.user_id', 'DESC');
  }

  async count(): Promise<number> {
    return this.collaborateRepository.count();
  }
}
