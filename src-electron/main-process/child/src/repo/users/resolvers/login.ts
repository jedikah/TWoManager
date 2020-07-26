import { Resolver, Query, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus } from '@nestjs/common';

import { UserEntity } from '../../database/entities';
import { UsersService } from '../users.service';
import { LoginInput, User, LoginOutput } from '../../types';
import { AuthsService } from '../../auths/auths.service';

const bcrypt = require('bcrypt');

@Resolver(of => UserEntity)
export class UsersLogin {
  constructor(
    private usersService: UsersService,
    private authsService: AuthsService,
  ) {}

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
}
