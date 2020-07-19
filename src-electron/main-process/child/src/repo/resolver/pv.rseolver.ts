import { Resolver, Query } from '@nestjs/graphql';

import { PvEntity } from '../database/entities';
import { PvService } from '../services';

@Resolver(of => PvEntity)
class PvResolver {
  constructor(private pvService: PvService) {}

  @Query(() => String)
  HelloWorld() {
    return 'hello';
  }

  @Query(() => String)
  findAll() {
    return this.pvService.findAll();
  }
}

export default PvResolver;
