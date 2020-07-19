import { Resolver, Query } from '@nestjs/graphql';

import { UserEntity } from '../database/entities';
import { UserService } from '../services';

@Resolver(of => UserEntity)
class UserResolver {
  constructor(private usersService: UserService) {}

  @Query(() => String)
  HelloWorld() {
    return 'hello';
  }

  @Query(() => String)
  findAll() {
    return this.usersService.findAll();
  }
}

export default UserResolver;
