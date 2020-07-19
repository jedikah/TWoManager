import { Resolver, Query } from '@nestjs/graphql';

import { FolderEntity } from '../database/entities';
import { FolderService } from '../services';

@Resolver(of => FolderEntity)
class FolderResolver {
  constructor(private folderService: FolderService) {}

  @Query(() => String)
  HelloWorld() {
    return 'hello';
  }

  @Query(() => String)
  findAll() {
    return this.folderService.findAll();
  }
}

export default FolderResolver;
