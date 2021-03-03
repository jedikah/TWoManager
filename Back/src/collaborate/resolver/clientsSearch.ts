import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Client } from '../../client/client.entity';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { CurrentUser } from '../../auths/currentUser';
import { UserOutput } from '../../user/user.types';
import { ClientServices } from '../../client/client.service';
import { ClientSearchInput } from '../../client/client.types';
import { CollaborationServices } from '../collaborate.service';

@Resolver(() => Client)
export class ClientSearch {
  constructor(
    private collaborationServices: CollaborationServices,
    private clientServices: ClientServices,
  ) {}

  @Query(() => [Client])
  @UseGuards(GqlAuthGuard)
  async clientSearch(
    @CurrentUser() user: UserOutput,
    @Args('input') input: ClientSearchInput,
  ): Promise<Client[]> {
    const collaborate = (
      await this.collaborationServices.getUserClients(user.userId).getMany()
    ).map(col => col.clientId);

    const clients: Client[] = await this.clientServices.getClientByName(
      collaborate,
      input.clientName,
    );

    return clients;
  }
}
