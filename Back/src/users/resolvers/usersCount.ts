import { Resolver, Query, Int } from '@nestjs/graphql';

import { User } from '../user.entity';
import { UsersService } from '../users.service';

@Resolver(() => User)
export class UsersCount {
  constructor(private usersService: UsersService) {}

  @Query(() => Int)
  async usersCount(): Promise<number> {
    return this.usersService.getUsersCount();
  }
}
