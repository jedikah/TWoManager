import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientEntity } from '../clients/client.entity';
import { UserOutput } from '../users/users.types';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientsRepository: Repository<ClientEntity>,
  ) {}

  getClientById(clientId: number): Promise<ClientEntity> {
    return this.clientsRepository.findOne(clientId);
  }

  async addClientByUser(addClient: ClientEntity): Promise<ClientEntity> {
    return this.clientsRepository.save(addClient);
  }

  async getClientsListByUser(user: UserOutput): Promise<ClientEntity[]> {
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

  async updateClient(client: ClientEntity): Promise<ClientEntity> {
    return this.clientsRepository.save(client);
  }
}
