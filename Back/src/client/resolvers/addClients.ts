import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Client } from '../client.entity';
import { ClientAddInput } from '../client.types';
import { ClientServices } from '../client.service';
import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../user/user.types';

@Resolver(of => Client)
export class AddClients {
  constructor(
    private clientServices: ClientServices,
  ) {}

  @Mutation(() => Client)
  @UseGuards(GqlAuthGuard)
  async addClientByUser(
    @CurrentUser() user: UserOutput,
    @Args('input')
    input: ClientAddInput,
  ): Promise<Client> {
    const newClient = new Client();

    Object.assign<Client, Partial<Client>>(newClient, {
      name: input.name,
      domicile: input.domicile,
      contact: input.contact,
    });

    const clientResponse = await this.clientServices.addClientByUser(newClient);

    return clientResponse;
  }
}
