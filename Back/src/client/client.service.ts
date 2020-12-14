import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { Client } from './client.entity';
import { UserOutput } from '../user/user.types';

@Injectable()
export class ClientServices {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async getClientById(clientId: number): Promise<Client> {
    return this.clientsRepository.findOne(clientId);
  }

  async getClientByName(
    clientsId: number[],
    clientName: string,
  ): Promise<Client[]> {
    return this.clientsRepository
      .createQueryBuilder('client')
      .whereInIds(clientsId)
      .andWhere('client.clientName like :clientName', {
        clientName: `%${clientName}%`,
      })
      .limit(5)
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

  async updateClient(client: Client): Promise<Client> {
    return this.clientsRepository.save(client);
  }
}
