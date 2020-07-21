import {
  Resolver,
  Query,
  ResolveField,
  Root,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserEntity, FolderEntity } from '../database/entities';
import { UsersService } from './users.service';
import { userType } from '../types';
import { AuthsService } from '../auths/auths.service';
import { GqlAuthGuard } from '../auths/jwt-auth.guard';
import { CurrentUser } from '../auths/currentUser';

@Resolver(of => UserEntity)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private authsService: AuthsService,
  ) {}

  // Login

  @Query(() => String)
  async login(@Args('input') input: userType.LoginInput) {
    const user = await this.usersService.getUserByLogin(input.login);
    const token = this.authsService.login(user.userId, input);
    return token.access_token;
  }

  // query

  @Query(() => [UserEntity], { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUsers() {
    return await this.usersService.getUsers();
  }

  // mutation

  @Mutation(() => userType.UserOutput)
  async adduser(@Args('input') input: userType.UserInput) {
    const newUser = new UserEntity();
    newUser.userName = input.userName;
    newUser.login = input.login;
    newUser.password = input.password;
    return await this.usersService.addUser(newUser);
  }

  // resolver field
  @ResolveField(() => [FolderEntity])
  folders(@Root() user: UserEntity) {
    //
  }
}
