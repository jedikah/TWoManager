import { Resolver, Query } from '@nestjs/graphql';
import { ClientsService } from '../clients.service';
import { UseGuards } from '@nestjs/common';
import { ClientEntity } from '../../database/entities';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { CurrentUser } from '../../auths/currentUser';
import { UserOutput } from '../../users/users.types';

@Resolver('ClientsList')
export class ClientsList {
  constructor(private clientsService: ClientsService) {}

  @Query(() => [ClientEntity])
  @UseGuards(GqlAuthGuard)
  async clientListByUser(
    @CurrentUser() user: UserOutput,
  ): Promise<ClientEntity[]> {
    const response = await this.clientsService.getClientsListByUser(user);
    return response;
  }
}
