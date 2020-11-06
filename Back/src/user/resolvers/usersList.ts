import { Resolver, Query, ResolveField, Root } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { User } from '../user.entity';
import { Folder } from '../../folder/folder.entity';
import { UserService } from '../user.service';
import { UserOutput } from '../user.types';
import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';

@Resolver(of => User)
export class UsersList {
  constructor(private userService: UserService) {}

  @Query(() => [User], { nullable: true })
  @UseGuards(GqlAuthGuard)
  async users(@CurrentUser() users: UserOutput): Promise<User[]> {
    if (users) return await this.userService.getUsers();

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
