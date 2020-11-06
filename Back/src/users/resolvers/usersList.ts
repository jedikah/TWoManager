import { Resolver, Query, Int, ResolveField, Root } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { User } from '../user.entity';
import { Folder } from '../../folders/folder.entity';
import { UsersService } from '../users.service';
import { UserOutput } from '../users.types';
import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';

@Resolver(of => User)
export class UsersList {
  constructor(private usersService: UsersService) {}

  @Query(() => [User], { nullable: true })
  @UseGuards(GqlAuthGuard)
  async users(@CurrentUser() users: UserOutput): Promise<User[]> {
    if (users) return await this.usersService.getUsers();

    throw new HttpException(
      'error registering user',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @ResolveField(() => [Folder])
  folders(@Root() user: User): Promise<Folder[]> {
    //
    return Promise.resolve([]);
  }
}
