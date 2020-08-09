import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { ClientEntity } from '../../database/entities';
import { ClientInput } from '../client.types';
import { ClientsService } from '../clients.service';
import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../users/users.types';

@Resolver(of => ClientEntity)
export class AddClients {
  constructor(private clientsService: ClientsService) {}

  //Query

  //MUTATION

  @Mutation(() => ClientEntity)
  @UseGuards(GqlAuthGuard)
  async addClientByUser(
    @CurrentUser() user: UserOutput,
    @Args('input')
    input: ClientInput,
  ): Promise<ClientEntity> {
    // try {
    return await this.clientsService.addClientByUser(input, user);
    // } catch (err) {
    // throw new HttpException('AddClientByUser', err);
    // }
  }
}
