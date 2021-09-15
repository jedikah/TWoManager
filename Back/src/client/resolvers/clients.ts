import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { PaginationInput } from '../../types';
import { ClientServices } from '../client.service';
import { ClientsFilterInput, ClientsResult } from '../client.types';

@Resolver('Clients')
export class Clients {
  constructor(private clientServices: ClientServices) {}

  @Query(() => ClientsResult)
  @UseGuards(GqlAuthGuard)
  async clients(
    @Args('filter') clientsFilterInput: ClientsFilterInput,
    @Args('pagination') paginationInput: PaginationInput,
  ): Promise<ClientsResult> {
    const request = this.clientServices.getClients(clientsFilterInput);

    const paginateClients = await this.clientServices.paginate(
      request,
      paginationInput,
    );
    
    return {
      clients: paginateClients.items,
      paginationMeta: paginateClients.meta,
    };
  }
}
