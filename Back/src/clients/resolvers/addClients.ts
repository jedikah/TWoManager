import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Client } from '../client.entity';
import { ClientAddInput } from '../client.types';
import { ClientsService } from '../clients.service';
import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../users/users.types';
import { Collaborate } from '../../collaborations/collaborate.entity';
import { User } from '../../users/user.entity';
import dateNow from '../../utils/dateFormat';
import { CollaborationsService } from '../../collaborations/collaborations.service';

@Resolver(of => Client)
export class AddClients {
  constructor(
    private clientsService: ClientsService,
    private collaborateService: CollaborationsService,
  ) {}

  @Mutation(() => Client)
  @UseGuards(GqlAuthGuard)
  async addClientByUser(
    @CurrentUser() user: UserOutput,
    @Args('input')
    input: ClientAddInput,
  ): Promise<Client> {
    const newClient = new Client();

    Object.assign<Client, Partial<Client>>(newClient, {
      clientName: input.clientName,
      domicile: input.domicile,
      contact: input.contact,
    });

    const clientResponse = await this.clientsService.addClientByUser(newClient);

    if (clientResponse) {
      const newCollaborate = new Collaborate();
      const newUser = new User();
      const newClient = new Client();

      newClient.clientId = clientResponse.clientId;

      newUser.userId = user.userId;

      newCollaborate.user = newUser;
      newCollaborate.client = newClient;
      newCollaborate.createdAt = dateNow();
      newCollaborate.updatedAt = dateNow();

      await this.collaborateService.addCollaboration(newCollaborate);
    }

    return clientResponse;
  }
}
