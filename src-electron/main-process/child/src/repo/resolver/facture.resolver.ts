import { Resolver, Query } from '@nestjs/graphql';

import { FactureEntity } from '../database/entities';
import { FactureService } from '../services';

@Resolver(of => FactureEntity)
class factureResolver {
  constructor(private factureService: FactureService) {}

  @Query(() => String)
  HelloWorld() {
    return 'hello';
  }

  @Query(() => String)
  findAll() {
    return this.factureService.findAll();
  }
}

export default factureResolver;
