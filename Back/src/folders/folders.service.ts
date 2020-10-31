import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'nestjs-typeorm-paginate/dist/interfaces';
import { paginate } from 'nestjs-typeorm-paginate/dist/paginate';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ClientEntity } from '../clients/client.entity';
import { UserEntity } from '../users/user.entity';
import { FolderEntity } from './folder.entity';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(FolderEntity)
    private FolderRepository: Repository<FolderEntity>,
  ) {}

  async paginate(
    qb: SelectQueryBuilder<FolderEntity>,
    options: IPaginationOptions,
  ): Promise<Pagination<FolderEntity>> {
    return paginate<FolderEntity>(qb, options);
  }

  foldersByUser({
    register = '',
    numTitle = '',
    groundName = '',
    userId,
  }): SelectQueryBuilder<FolderEntity> {
    return this.FolderRepository.createQueryBuilder('folders')
      .where('folders.register like :register', { register: `%${register}%` })
      .andWhere('folders.numTitle like :numTitle', {
        numTitle: `%${numTitle}%`,
      })
      .andWhere('folders.groundName like :groundName', {
        groundName: `%${groundName}%`,
      })
      .andWhere('folders.user_id like :user_id', {
        user_id: `%${userId}%`,
      })
      .orderBy('folders.user_id', 'DESC');
  }

  async addFolder(folder: FolderEntity): Promise<FolderEntity> {
    return this.FolderRepository.save(folder);
  }

  async updateFolder(folder: FolderEntity): Promise<FolderEntity> {
    return this.FolderRepository.save(folder);
  }

  async FoldersByUsers(
    user: UserEntity,
    client: ClientEntity,
  ): Promise<FolderEntity[]> {
    return this.FolderRepository.find({
      where: {
        user,
        client,
      },
    });
  }

  async FolderById(folderId: number): Promise<FolderEntity> {
    return this.FolderRepository.findOne(folderId);
  }
}
