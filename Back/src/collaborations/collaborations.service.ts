import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CollaborateEntity } from '../database/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CollaborationsService {
  constructor(
    @InjectRepository(CollaborateEntity)
    private collaborateRepository: Repository<CollaborateEntity>,
  ) {}

  async addCollaboration(
    collaborate: CollaborateEntity,
  ): Promise<CollaborateEntity> {
    return await this.collaborateRepository.save(collaborate);
  }

  getUserClients(userId: number): Promise<CollaborateEntity[]> {
    return this.collaborateRepository.find({
      where: {
        user: userId,
      },
    });
  }
}
