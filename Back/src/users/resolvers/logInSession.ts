import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { UserEntity } from '../user.entity';
import { UsersService } from '../users.service';
import { LogInInput, UserOutput } from '../users.types';
import { AuthsService } from '../../auths/auths.service';
import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';

@Resolver(of => UserEntity)
export class UsersLogInSession {
  constructor(
    private usersService: UsersService,
    private authsService: AuthsService,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async loginSession(
    @CurrentUser() users: UserOutput,
    @Args('input') input: LogInInput,
  ): Promise<boolean> {
    let response = false;
    if (users) {
      const user = (await this.usersService.getUserByLogin(
        input.login.toLocaleLowerCase(),
      )) as UserEntity;

      response = await this.usersService.pwdCompare(
        input.password,
        user.password,
      );
    }
    return response;
  }
}
