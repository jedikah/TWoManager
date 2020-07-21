/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../database/entities';
import { userType } from '../types';

@Injectable()
export class AuthsService {
  constructor(private jwtService: JwtService) {}

  login(id: number, user: userType.LoginInput): { access_token: string } {
    const payload = { login: user.login, userId: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
