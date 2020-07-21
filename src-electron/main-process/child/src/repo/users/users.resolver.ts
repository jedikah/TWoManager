import {
  Resolver,
  Query,
  ResolveField,
  Root,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';

import { UserEntity, FolderEntity } from '../database/entities';
import { UsersService } from './users.service';
import { LoginInput, UserInput, UserOutput } from '../types';
import { AuthsService } from '../auths/auths.service';
import { GqlAuthGuard } from '../auths/jwt-auth.guard';
import { CurrentUser } from './users.paramDecorator';

@Resolver(of => UserEntity)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private authsService: AuthsService,
  ) {}

  // Login & Register

  @Query(() => String)
  async login(@Args('input') input: LoginInput) {
    const user = (await this.usersService.register(input)) as UserOutput;
    if (user) return this.authsService.login(user).access_token;
    throw new HttpException(
      'error logging user in',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Mutation(() => UserOutput)
  async register(@Args('input') input: UserInput) {
    const newUser = new UserEntity();
    newUser.userName = input.userName;
    newUser.login = input.login;
    newUser.password = input.password;
    return await this.usersService.addUser(newUser);
  }

  // query

  @Query(() => [UserEntity], { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUsers(@CurrentUser() users: UserOutput) {
    if (users) return await this.usersService.getUsers();
    throw new HttpException(
      'error registering user',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  // mutation

  // field resolver
  @ResolveField(() => [FolderEntity])
  folders(@Root() user: UserEntity) {
    //
  }
}
