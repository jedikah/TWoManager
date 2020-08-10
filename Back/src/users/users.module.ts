import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthsService } from '../auths/auths.service';
import { jwtConstants } from '../auths/constants';
import { UserEntity } from '../database/entities';
import { JwtStrategy } from '../auths/jwt.strategy';
import { UsersResolver } from './resolvers';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [...UsersResolver, UsersService, AuthsService, JwtStrategy],
  exports: [...UsersResolver, UsersService],
})
export class UsersModule {}
