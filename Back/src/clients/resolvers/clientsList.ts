import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Client } from '../client.entity';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { CurrentUser } from '../../auths/currentUser';
import { UserOutput } from '../../users/users.types';
import { ClientsService } from '../clients.service';

@Resolver('ClientsList')
export class ClientsList {
  constructor(private clientsService: ClientsService) {}

  @Query(() => [Client])
  @UseGuards(GqlAuthGuard)
  async clientListByUser(@CurrentUser() user: UserOutput): Promise<Client[]> {
    const response = await this.clientsService.getClientsListByUser(user);
    return response;
  }
}
