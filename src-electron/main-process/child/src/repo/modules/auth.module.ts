import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthsService } from '../auths/auths.service';
import { jwtConstants } from '../auths/constants';
import Entities from '../database/entities';
import { JwtStrategy } from '../auths/jwt.strategy';
import { UsersModule, ClientModule } from './index';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    UsersModule,
    // forwardRef(() => ClientModule),
  ],
  providers: [AuthsService, JwtStrategy],
  exports: [AuthsService],
})
export class AuthModule {}
