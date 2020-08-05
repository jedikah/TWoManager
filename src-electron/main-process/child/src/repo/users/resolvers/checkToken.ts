import { Resolver, Args, Query } from '@nestjs/graphql';

import { UserEntity } from '../../database/entities';
import { VerifyToken } from '../../types';
import { AuthsService } from '../../auths/auths.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(of => UserEntity)
export class UsersCheckToken {
  constructor(private authsService: AuthsService) {}

  @Query(() => VerifyToken)
  async checkToken(@Args('input') input: string) {
    try {
      const currentUserToken = await this.authsService.checkToken(input);
      let val = null;
      const exp =
        currentUserToken.exp -
        parseInt(
          Date.now()
            .toString(10)
            .substring(0, 10),
        );
      if (exp > 0) val = currentUserToken;

      return val;
    } catch (err) {
      throw new HttpException(
        'Votre dernière session a expiré, se connecter pour une nouvelle session',
        HttpStatus.UNAUTHORIZED,
      );
      return null;
    }
  }
}
