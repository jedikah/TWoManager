import { Resolver, Query } from '@nestjs/graphql';

import { UserEntity } from '../database/entities/user.entity';
import UsersService from '../services/users.service';

@Resolver(of => UserEntity)
class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => String)
  HelloWorld() {
    return 'hello';
  }
}

export default UsersResolver;
