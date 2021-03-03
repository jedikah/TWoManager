import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthsService } from './auths.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    UsersModule,
  ],
  providers: [AuthsService, JwtStrategy],
  exports: [AuthsService],
})
export class AuthModule {}
