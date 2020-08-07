import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity, CollaborateEntity } from '../database/entities';
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

  async addClientByUser(
    newClient: ClientInput,
    user: UserOutput,
  ): Promise<ClientEntity> {
    console.log({ newClient, user });
    const clientResponse = await this.clientsRepository.save(newClient);

    console.log({ clientResponse });
    if (clientResponse) {
      const collaborate = new CollaborateEntity();
      collaborate.userId = user.userId;
      collaborate.clientId = clientResponse.clientId;
      collaborate.createdAt = dateNow();
      collaborate.updatedAt = dateNow();
      await this.collaborateService.addCollaboration(collaborate);
    }

    return clientResponse;
  }
}
