import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { ClientServices } from '../client.service';
import {  ClientsSearchFilterInput } from '../client.types';
import { Client } from '../client.entity';

@Resolver('Clients')
export class ClientsSearch {
  constructor(private clientServices: ClientServices) {}

  @Query(() => [Client])
  @UseGuards(GqlAuthGuard)
  async clientsSearch(
    @Args('filter') filter: ClientsSearchFilterInput,
  ): Promise<Client[]> {

    return await this.clientServices.getClientByName(filter.name, filter.limit)
  }
}
