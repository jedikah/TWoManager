import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ClientEntity } from 'src/database/entities';
import { GqlAuthGuard } from 'src/auths/jwt-auth.guard';
import { CurrentUser } from 'src/auths/currentUser';
import { UserOutput } from 'src/users/users.types';
import { CollaborationsService } from '../collaborations.service';
import { ClientsService } from 'src/clients/clients.service';

@Resolver(() => ClientEntity)
@UseGuards(GqlAuthGuard)
export class UserClientsResolver {
  constructor(
    private collaborationService: CollaborationsService,
    private clientService: ClientsService,
  ) {}

  @Query(() => [ClientEntity])
  async userClients(@CurrentUser() user: UserOutput): Promise<ClientEntity[]> {
    return Promise.all(
      (await this.collaborationService.getUserClients(user.userId)).map(
        async coll => {
          return this.clientService.getClientById(coll.clientId);
        },
      ),
    );
  }
}
