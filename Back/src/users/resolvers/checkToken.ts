import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { HttpException, HttpStatus } from '@nestjs/common';

import { UserEntity } from '../../database/entities';
import { CheckTokenOutput } from '../users.types';
import { AuthsService } from '../../auths/auths.service';

@Resolver(of => UserEntity)
export class UsersCheckToken {
  constructor(private authsService: AuthsService) {}

  //Query

  @Mutation(() => CheckTokenOutput)
  async checkToken(@Args('input') input: string): Promise<CheckTokenOutput> {
    try {
      let val = null;
      const currentUserToken = await this.authsService.checkToken(input);

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
    }
  }
}
