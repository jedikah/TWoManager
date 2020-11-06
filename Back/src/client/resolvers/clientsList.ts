import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Client } from '../client.entity';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { CurrentUser } from '../../auths/currentUser';
import { UserOutput } from '../../user/user.types';
import { ClientServices } from '../client.service';

@Resolver('ClientsList')
export class ClientsList {
  constructor(private clientServices: ClientServices) {}

  @Query(() => [Client])
  @UseGuards(GqlAuthGuard)
  async clientListByUser(@CurrentUser() user: UserOutput): Promise<Client[]> {
    const response = await this.clientServices.getClientsListByUser(user);
    return response;
  }
}
