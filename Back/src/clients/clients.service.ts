import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientEntity } from '../clients/client.entity';
import { CollaborateEntity } from '../collaborations/collaborate.entity';
import { UserEntity } from '../users/user.entity';
import dateNow from '../utils/dateFormat';
import { UserOutput } from '../users/users.types';
import { ClientInput } from './client.types';
import { CollaborationsService } from '../collaborations/collaborations.service';

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
    addClient: ClientInput,
    user: UserOutput,
  ): Promise<ClientEntity> {
    const clientResponse = await this.clientsRepository.save(addClient);

    if (clientResponse) {
      const newCollaborateEntity = new CollaborateEntity();
      const newUser = new UserEntity();
      const newClient = new ClientEntity();

      newClient.clientId = clientResponse.clientId;

      newUser.userId = user.userId;

      newCollaborateEntity.user = newUser;
      newCollaborateEntity.client = newClient;
      newCollaborateEntity.createdAt = dateNow();
      newCollaborateEntity.updatedAt = dateNow();

      console.log({ newCollaborateEntity });

      await this.collaborateService.addCollaboration(newCollaborateEntity);
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
