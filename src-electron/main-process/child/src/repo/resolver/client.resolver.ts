import { Resolver, Query } from '@nestjs/graphql';

import { ClientEntity } from '../database/entities';
import { ClientService } from '../services';

@Resolver(of => ClientEntity)
class ClientResolver {
  constructor(private clientService: ClientService) {}

  @Query(() => String)
  HelloWorld() {
    return 'hello';
  }

  @Query(() => String)
  findAll() {
    return this.clientService.findAll();
  }
}

export default ClientResolver;
