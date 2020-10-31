import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ClientEntity } from '../client.entity';
import { ClientAddInput } from '../client.types';
import { ClientsService } from '../clients.service';
import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../users/users.types';
import { CollaborateEntity } from '../../collaborations/collaborate.entity';
import { UserEntity } from '../../users/user.entity';
import dateNow from '../../utils/dateFormat';
import { CollaborationsService } from '../../collaborations/collaborations.service';

@Resolver(of => ClientEntity)
export class AddClients {
  constructor(
    private clientsService: ClientsService,
    private collaborateService: CollaborationsService,
  ) {}

  @Mutation(() => ClientEntity)
  @UseGuards(GqlAuthGuard)
  async addClientByUser(
    @CurrentUser() user: UserOutput,
    @Args('input')
    input: ClientAddInput,
  ): Promise<ClientEntity> {
    const newClient = new ClientEntity();

    Object.assign<ClientEntity, Partial<ClientEntity>>(newClient, {
      clientName: input.clientName,
      domicile: input.domicile,
      contact: input.contact,
    });

    const clientResponse = await this.clientsService.addClientByUser(newClient);

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

      await this.collaborateService.addCollaboration(newCollaborateEntity);
    }

    return clientResponse;
  }
}
