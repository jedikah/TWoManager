import { Resolver, Query, Int, ResolveField, Root } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { UserEntity, FolderEntity } from '../../database/entities';
import { UsersService } from '../users.service';
import { UserOutput } from '../users.types';
import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';

@Resolver(of => UserEntity)
export class UsersList {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserEntity], { nullable: true })
  @UseGuards(GqlAuthGuard)
  async users(@CurrentUser() users: UserOutput): Promise<UserEntity[]> {
    if (users) return await this.usersService.getUsers();

    throw new HttpException(
      'error registering user',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Query(() => Int)
  async usersCount(): Promise<number> {
    return this.usersService.getUsersCount();
  }

  @ResolveField(() => [FolderEntity])
  folders(@Root() user: UserEntity): Promise<FolderEntity[]> {
    //
    return Promise.resolve([]);
  }
}
