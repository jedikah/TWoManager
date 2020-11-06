import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Client } from '../client.entity';
import { ClientAddInput } from '../client.types';
import { ClientServices } from '../client.service';
import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../user/user.types';
import { Collaborate } from '../../collaborate/collaborate.entity';
import { User } from '../../user/user.entity';
import dateNow from '../../utils/dateFormat';
import { CollaborationServices } from '../../collaborate/collaborate.service';

@Resolver(of => Client)
export class AddClients {
  constructor(
    private clientServices: ClientServices,
    private collaborateServices: CollaborationServices,
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

    const clientResponse = await this.clientServices.addClientByUser(newClient);

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

      await this.collaborateServices.addCollaboration(newCollaborate);
    }

    return clientResponse;
  }
}
