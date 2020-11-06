import { Resolver, Query, ObjectType, Field, Int, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Client } from '../../clients/client.entity';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { CurrentUser } from '../../auths/currentUser';
import { UserOutput } from '../../users/users.types';
import { CollaborationsService } from '../collaborations.service';
import { ClientsService } from '../../clients/clients.service';
import { PaginationService } from '../../utils/pagination.service';
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
    private collaborationService: CollaborationsService,
    private clientService: ClientsService,
  ) {}

  @Query(() => ClientsCollaborateResult)
  async userClients(
    @CurrentUser() user: UserOutput,
    @Args('paginationInput') paginationInput: PaginationInput,
  ): Promise<ClientsCollaborateResult> {
    const request: SelectQueryBuilder<Collaborate> = this.collaborationService.getUserClients(
      user.userId,
    );

    const paginateClients = await this.collaborationService.paginate(
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
