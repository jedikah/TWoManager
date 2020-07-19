import { Resolver, Query } from '@nestjs/graphql';

import { CollaborateEntity } from '../database/entities';
import { CollaborationService } from '../services';

@Resolver(of => CollaborateEntity)
class collaborationResolver {
  constructor(private collaborationService: CollaborationService) {}

  @Query(() => String)
  HelloWorld() {
    return 'hello';
  }

  // @Query(() => String)
  // findAll() {
  //   return this.collaborationService.findAll();
  // }
}

export default collaborationResolver;
