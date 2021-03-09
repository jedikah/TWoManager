import { Clients } from './resolvers/clients';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { Client } from './client.entity';
import { UserOutput } from '../user/user.types';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ClientServices {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async paginate(
    qb: SelectQueryBuilder<Client>,
    options: IPaginationOptions,
  ): Promise<Pagination<Client>> {
    return paginate<Client>(qb, options);
  }

  async getClientById(clientId: number): Promise<Client> {
    return this.clientsRepository.findOne({clientId});
  }

  async getClientByName(
    name: string,
    limit = 5,
  ): Promise<Client[]> {
    return this.clientsRepository
      .createQueryBuilder('client')
      .where('client.name like :name', {
        name: `%${name}%`,
      })
      .limit(limit)
      .getMany();
  }

  async addClientByUser(addClient: Client): Promise<Client> {
    return this.clientsRepository.save(addClient);
  }

  async getClientsListByUser(user: UserOutput): Promise<Client[]> {
    const response = this.clientsRepository.find({
      relations: ['user'],
      where: {
        user: {
          userId: user.userId,
        },
      },
    });

    return response;
  }

  getClients({name = '', domicile = '', contact = ''}): SelectQueryBuilder<Client> {
    return this.clientsRepository.createQueryBuilder()
    .where('name like :name', {name: `%${name}%`})
    .andWhere('domicile like :domicile', {domicile: `%${domicile}%`})
    .andWhere('contact like :contact', {contact: `%${contact}%`})
    .orderBy('client_id', 'DESC')

  }

  async updateClient(client: Client): Promise<Client> {
    return this.clientsRepository.save(client);
  }
}
