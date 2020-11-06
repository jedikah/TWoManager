import { Resolver, Query, ObjectType, Field, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Client } from '../../client/client.entity';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { CurrentUser } from '../../auths/currentUser';
import { UserOutput } from '../../user/user.types';
import { CollaborationServices } from '../collaborate.service';
import { ClientServices } from '../../client/client.service';
import { SelectQueryBuilder } from 'typeorm';
import { Collaborate } from '../collaborate.entity';
import { PaginationInput, PaginationMeta } from '../../types';

@ObjectType()
class ClientsCollaborateResult {
  @Field(() => [Client])
  clients: Client[];

  @Field(() => PaginationMeta)
  paginationMeta: PaginationMeta;
}

@Resolver(() => Client)
@UseGuards(GqlAuthGuard)
export class UserClientsResolver {
  constructor(
    private collaborationServices: CollaborationServices,
    private clientService: ClientServices,
  ) {}

  @Query(() => ClientsCollaborateResult)
  async userClients(
    @CurrentUser() user: UserOutput,
    @Args('paginationInput') paginationInput: PaginationInput,
  ): Promise<ClientsCollaborateResult> {
    const request: SelectQueryBuilder<Collaborate> = this.collaborationServices.getUserClients(
      user.userId,
    );

    const paginateClients = await this.collaborationServices.paginate(
      request,
      paginationInput,
    );

    const clients = await Promise.all(
      paginateClients.items.map(async coll => {
        return this.clientService.getClientById(coll.clientId);
      }),
    );

    return {
      clients,
      paginationMeta: paginateClients.meta,
    };
  }
}
