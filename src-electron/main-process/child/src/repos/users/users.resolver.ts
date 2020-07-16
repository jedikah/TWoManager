import { Resolver, Query } from '@nestjs/graphql';

import { UserEntity } from '../database/entities/user.entity';
import { UsersService } from './users.service';

@Resolver(of => UserEntity)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => String)
  getHello() {
    return 'hello';
  }
}
