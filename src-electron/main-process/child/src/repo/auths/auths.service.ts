/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../database/entities';
import { LoginInput, UserOutput } from '../types';

@Injectable()
export class AuthsService {
  constructor(private jwtService: JwtService) {}

  login(user: UserOutput): { access_token: string } {
    const payload = {
      login: user.login,
      userId: user.userId,
      userName: user.userName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
