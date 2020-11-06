import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { User } from '../user.entity';
import { UserService } from '../user.service';
import { LogInInput, UserOutput } from '../user.types';
import { AuthsService } from '../../auths/auths.service';
import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';

@Resolver(() => User)
export class UsersLogInSession {
  constructor(
    private userService: UserService,
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
      const user = (await this.userService.getUserByLogin(
        input.login.toLocaleLowerCase(),
      )) as User;

      response = await this.userService.pwdCompare(
        input.password,
        user.password,
      );

      if (!response)
        throw new HttpException(
          'Le mot de pass est incorrect.',
          HttpStatus.UNAUTHORIZED,
        );
    }
    return response;
  }
}
