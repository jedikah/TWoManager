import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from './client.entity';
import { UserOutput } from '../user/user.types';

@Injectable()
export class ClientServices {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  getClientById(clientId: number): Promise<Client> {
    return this.clientsRepository.findOne(clientId);
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
