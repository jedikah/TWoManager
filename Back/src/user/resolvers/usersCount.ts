import { Resolver, Query, Int } from '@nestjs/graphql';

import { User } from '../user.entity';
import { UserService } from '../user.service';

@Resolver(() => User)
export class UsersCount {
  constructor(private userService: UserService) {}

  @Query(() => Int)
  async usersCount(): Promise<number> {
    return this.userService.getUsersCount();
  }
}
