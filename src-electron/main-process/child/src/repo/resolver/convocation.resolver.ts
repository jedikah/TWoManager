import { Resolver, Query } from '@nestjs/graphql';

import { ConvocationEntity } from '../database/entities';
import { ConvocationService } from '../services';

@Resolver(of => ConvocationEntity)
class convocationResolver {
  constructor(private convocationService: ConvocationService) {}

  @Query(() => String)
  HelloWorld() {
    return 'hello';
  }

  @Query(() => String)
  findAll() {
    return this.convocationService.findAll();
  }
}

export default convocationResolver;
