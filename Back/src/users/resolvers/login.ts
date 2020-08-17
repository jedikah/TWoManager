import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { UserEntity } from '../../database/entities';
import { UsersService } from '../users.service';
import { LoginInput, User, LoginOutput, UserOutput } from '../users.types';
import { AuthsService } from '../../auths/auths.service';
import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';

const bcrypt = require('bcrypt');

@Resolver(of => UserEntity)
export class UsersLogin {
  constructor(
    private usersService: UsersService,
    private authsService: AuthsService,
  ) {}

  async pwdCompare(inputPwd: string, pwd: string): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      bcrypt.compare(inputPwd, pwd, (err, result) => {
        if (!result) resolve(result);
        else resolve(result);
      });
    });
  }

  @Mutation(() => LoginOutput)
  async login(@Args('input') input: LoginInput): Promise<LoginOutput> {
    const user = (await this.usersService.getUserByLogin(
      input.login.toLocaleLowerCase(),
    )) as User;

    if (user) {
      const isMatch = await this.pwdCompare(input.password, user.password);

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
          "Le mot de passe ne correspond pas. Veuillez verifier s'il vous plaie.",
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    }

    throw new HttpException(
      'Ce login ne correspond pas!',
      HttpStatus.NOT_FOUND,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async loginSession(
    @CurrentUser() users: UserOutput,
    @Args('input') input: LoginInput,
  ): Promise<boolean> {
    let response = false;
    if (users) {
      const user = (await this.usersService.getUserByLogin(
        input.login.toLocaleLowerCase(),
      )) as User;

      response = await this.pwdCompare(input.password, user.password);
    }
    return response;
  }
}
