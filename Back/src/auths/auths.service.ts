import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserOutput } from '../user/user.types';

@Injectable()
export class AuthsService {
  constructor(private jwtService: JwtService) {}

  login(user: UserOutput): { access_token: string } {
    const payload = {
      login: user.login,
      userId: user.userId,
      userName: user.userName,
      photo: user.photo,
      type: user.type,
      status: user.status,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  checkToken(token: string) {
    return this.jwtService.verify(token);
  }
}
