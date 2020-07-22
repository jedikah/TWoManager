import {
  Resolver,
  Query,
  ResolveField,
  Root,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql';
import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';

import { UserEntity, FolderEntity } from '../database/entities';
import { UsersService } from './users.service';
import { LoginInput, UserInput, User, UserOutput, LoginOutput } from '../types';
import { AuthsService } from '../auths/auths.service';
import { GqlAuthGuard } from '../auths/jwt-auth.guard';
import { CurrentUser } from './users.paramDecorator';
import { rejects } from 'assert';

const bcrypt = require('bcrypt');
const saltRounds = 11;

@Resolver(of => UserEntity)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private authsService: AuthsService,
  ) {}

  // Login & Register

  @Query(() => LoginOutput)
  async login(@Args('input') input: LoginInput) {
    const user = (await this.usersService.getUserByLogin(
      input.login.toLocaleLowerCase(),
    )) as User;

    if (user) {
      const isMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(input.password, user.password, function(err, result) {
          if (!result) resolve(result);
          else resolve(result);
        });
      });

      if (isMatch) {
        if (user.status === true) {
          const { password, ...userOutput } = user;

          return {
            token: this.authsService.login(userOutput).access_token,
            type: user.type,
          };
        } else {
          throw new HttpException(
            "Votre login n'a pas encore été validé par l'administrateur",
            HttpStatus.UNAUTHORIZED,
          );
        }
      } else {
        throw new HttpException(
          'Ce mot de passe ne correspond pas!',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    }

    throw new HttpException(
      'Ce login ne correspond pas!',
      HttpStatus.NOT_FOUND,
    );
  }

  @Mutation(() => UserOutput)
  async register(@Args('input') input: UserInput) {
    const newUser = new UserEntity();

    let passToHash = (await new Promise(function(resolve, reject) {
      bcrypt.hash(input.password, saltRounds, function(err, hash) {
        if (!hash) reject(err);
        else resolve(hash);
      });
    })) as string;

    newUser.userName = input.userName;
    newUser.login = input.login.toLocaleLowerCase();
    newUser.password = passToHash;
    if ((await this.usersService.getUsersCount()) === 0) {
      newUser.type = 'administrator';
      newUser.status = true;
    }

    return await this.usersService.setRegister(newUser);
  }

  // query

  @Query(() => [UserEntity], { nullable: true })
  @UseGuards(GqlAuthGuard)
  async users(@CurrentUser() users: UserOutput) {
    if (users) return await this.usersService.getUsers();

    throw new HttpException(
      'error registering user',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Query(() => Int)
  async usersCount() {
    return this.usersService.getUsersCount();
  }

  // mutation

  // field resolver
  @ResolveField(() => [FolderEntity])
  folders(@Root() user: UserEntity) {
    //
  }
}
