import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { Client } from '../client.entity';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { ClientsService } from '../clients.service';
import { ClientUpdateInput } from '../client.types';

@Resolver('UpdateClient')
export class UpdateClient {
  constructor(private clientsService: ClientsService) {}

  @Mutation(() => Client)
  @UseGuards(GqlAuthGuard)
  async updateClient(@Args('input') input: ClientUpdateInput): Promise<Client> {
    let client = new Client();
    client = await this.clientsService.getClientById(input.clientId);
    Object.assign<Client, Partial<Client>>(client, {
      clientName: input.clientName,
      domicile: input.domicile,
      contact: input.contact,
    });
    return await this.clientsService.updateClient(client);
  }
}
