import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { Client } from '../client.entity';
import { ClientServices } from '../client.service';
import { ClientUpdateInput } from '../client.types';

@Resolver('UpdateClient')
export class UpdateClient {
  constructor(private clientServices: ClientServices) {}

  @Mutation(() => Client)
  @UseGuards(GqlAuthGuard)
  async updateClient(@Args('input') input: ClientUpdateInput): Promise<Client> {
    let client = new Client();
    client = await this.clientServices.getClientById(input.id);
    Object.assign<Client, Partial<Client>>(client, {
      name: input.name,
      domicile: input.domicile,
      contact: input.contact,
    });
    return await this.clientServices.updateClient(client);
  }
}
