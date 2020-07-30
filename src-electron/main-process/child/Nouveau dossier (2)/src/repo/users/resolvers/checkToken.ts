import { Resolver, Args, Query } from '@nestjs/graphql';

import { UserEntity } from '../../database/entities';
import { VerifyToken } from '../../types';
import { AuthsService } from '../../auths/auths.service';

@Resolver(of => UserEntity)
export class UsersCheckToken {
  constructor(private authsService: AuthsService) {}

  @Query(() => VerifyToken)
  async checkToken(@Args('input') input: string) {
    return await this.authsService.checkToken(input);
  }
}
