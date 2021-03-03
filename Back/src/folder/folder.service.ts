import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'nestjs-typeorm-paginate/dist/interfaces';
import { paginate } from 'nestjs-typeorm-paginate/dist/paginate';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Client } from '../client/client.entity';
import { User } from '../user/user.entity';
import { Folder } from './folder.entity';

@Injectable()
export class FolderServices {
  constructor(
    @InjectRepository(Folder)
    private FolderRepository: Repository<Folder>,
  ) {}

  async paginate(
    qb: SelectQueryBuilder<Folder>,
    options: IPaginationOptions,
  ): Promise<Pagination<Folder>> {
    return paginate<Folder>(qb, options);
  }

  foldersByUser({
    register = '',
    numTitle = '',
    groundName = '',
    userId,
  }): SelectQueryBuilder<Folder> {
    return this.FolderRepository.createQueryBuilder('folder')
      .where('folder.register like :register', { register: `%${register}%` })
      .andWhere('folder.numTitle like :numTitle', {
        numTitle: `%${numTitle}%`,
      })
      .andWhere('folder.groundName like :groundName', {
        groundName: `%${groundName}%`,
      })
      .andWhere('folder.user_id = :user_id', {
        user_id: userId,
      })
      .orderBy('folder.folderId', 'DESC');
  }

  async addFolder(folder: Folder): Promise<Folder> {
    return this.FolderRepository.save(folder);
  }

  async updateFolder(folder: Folder): Promise<Folder> {
    return this.FolderRepository.save(folder);
  }

  async FoldersByUsers(user: User, client: Client): Promise<Folder[]> {
    return this.FolderRepository.find({
      where: {
        user,
        client,
      },
    });
  }

  async FolderById(folderId: number): Promise<Folder> {
    return this.FolderRepository.findOne(folderId);
  }
}
