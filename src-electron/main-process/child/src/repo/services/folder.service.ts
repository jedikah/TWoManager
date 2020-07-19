import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FolderEntity } from '../database/entities';

@Injectable()
class FolderService {
  constructor(
    @InjectRepository(FolderEntity)
    private folderRepository: Repository<FolderEntity>,
  ) {}

  // async findAll(): Promise<FolderEntity[]> {
  //   return this.folderRepository.find();
  // }
}

export default FolderService;
