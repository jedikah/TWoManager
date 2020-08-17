import { Resolver, Query, ObjectType, Field, Int, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ClientEntity } from '../../clients/client.entity';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { CurrentUser } from '../../auths/currentUser';
import { UserOutput } from '../../users/users.types';
import { CollaborationsService } from '../collaborations.service';
import { ClientsService } from '../../clients/clients.service';
import { PaginationService } from '../../utils/pagination.service';

@ObjectType()
class PaginateUserClients {
  @Field()
  hasMore: boolean;

  @Field(() => Int)
  cursor: number;

  @Field(() => [ClientEntity])
  clients: ClientEntity[];
}

@Resolver(() => ClientEntity)
@UseGuards(GqlAuthGuard)
export class UserClientsResolver {
  constructor(
    private collaborationService: CollaborationsService,
    private clientService: ClientsService,
    private paginationService: PaginationService,
  ) {}

  @Query(() => PaginateUserClients)
  async userClients(
    @Args('pageSize') pageSize: number,
    @Args('after') after: number,
    @CurrentUser() user: UserOutput,
  ): Promise<PaginateUserClients> {
    const clients = await Promise.all(
      (await this.collaborationService.getUserClients(user.userId)).map(
        async coll => {
          return this.clientService.getClientById(coll.clientId);
        },
      ),
    );

    const paginateResult = this.paginationService.pagination<ClientEntity>(
      clients,
      'clientId',
      pageSize,
      after,
    );

    return {
      hasMore: paginateResult.hasMore,
      clients: paginateResult.list,
      cursor: paginateResult.cursor,
    };
  }
}
