import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollaborateEntity } from '../database/entities';

@Injectable()
class CollaborationService {
  constructor(
    @InjectRepository(CollaborateEntity)
    private collaborationRepository: Repository<CollaborateEntity>,
  ) {}

  // async findAll(): Promise<CollaborateEntity[]> {
  //   return this.collaborationRepository.find();
  // }
}

export default CollaborationService;
