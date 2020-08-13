import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ClientEntity,
  CollaborateEntity,
  UserEntity,
} from '../database/entities';
import dateNow from '../utils/dateFormat';
import { UserOutput } from '../users/users.types';
import { ClientInput } from './client.types';
import { CollaborationsService } from '../collaborations/collaborations.service';
import { TableName } from '../database/TableName';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientsRepository: Repository<ClientEntity>,
    private collaborateService: CollaborationsService,
  ) {}

  getClientById(clientId: number): Promise<ClientEntity> {
    return this.clientsRepository.findOne(clientId);
  }

  async addClientByUser(
    newClient: ClientInput,
    user: UserOutput,
  ): Promise<ClientEntity> {
    console.log({ newClient, user });
    const clientResponse = await this.clientsRepository.save(newClient);

    console.log({ clientResponse });
    if (clientResponse) {
      const newCollaborate = new CollaborateEntity();
      const newUser = new UserEntity();

      newUser.userId = user.userId;

      newCollaborate.user = newUser;
      newCollaborate.clientId = clientResponse.clientId;
      newCollaborate.createdAt = dateNow();
      newCollaborate.updatedAt = dateNow();
      await this.collaborateService.addCollaboration(newCollaborate);
    }

    return clientResponse;
  }

  async getClientsListByUser(user: UserOutput): Promise<ClientEntity[]> {
    const response = await this.clientsRepository.find({
      relations: ['user'],
      where: {
        user: {
          userId: user.userId,
        },
      },
    });

    return response;
  }
}
