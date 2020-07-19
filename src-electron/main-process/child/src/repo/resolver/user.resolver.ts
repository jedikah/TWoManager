import { Resolver, Query, ResolveField, Root } from '@nestjs/graphql';

import { UserEntity, FolderEntity } from '../database/entities';
import { UserService } from '../services';

@Resolver(of => UserEntity)
class UserResolver {
  constructor(private usersService: UserService) {}

  @Query(() => String)
  HelloWorld() {
    return 'hello';
  }

  @Query(() => [UserEntity], { nullable: true })
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @ResolveField(() => [FolderEntity])
  folders(@Root() user: UserEntity) {}
}

export default UserResolver;
