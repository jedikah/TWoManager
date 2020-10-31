import { Resolver, Query, ObjectType, Field, Int, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ClientEntity } from '../../clients/client.entity';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { CurrentUser } from '../../auths/currentUser';
import { UserOutput } from '../../users/users.types';
import { CollaborationsService } from '../collaborations.service';
import { ClientsService } from '../../clients/clients.service';
import { PaginationService } from '../../utils/pagination.service';
import { SelectQueryBuilder } from 'typeorm';
import { CollaborateEntity } from '../collaborate.entity';
import { PaginationInput, PaginationMeta } from '../../types';

@ObjectType()
class ClientsCollaborateResult {
  @Field(() => [ClientEntity])
  clients: ClientEntity[];

  @Field(() => PaginationMeta)
  paginationMeta: PaginationMeta;
}

@Resolver(() => ClientEntity)
@UseGuards(GqlAuthGuard)
export class UserClientsResolver {
  constructor(
    private collaborationService: CollaborationsService,
    private clientService: ClientsService,
    private paginationService: PaginationService,
  ) {}

  @Query(() => ClientsCollaborateResult)
  async userClients(
    @CurrentUser() user: UserOutput,
    @Args('paginationInput') paginationInput: PaginationInput,
  ): Promise<ClientsCollaborateResult> {
    const request: SelectQueryBuilder<CollaborateEntity> = this.collaborationService.getUserClients(
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
