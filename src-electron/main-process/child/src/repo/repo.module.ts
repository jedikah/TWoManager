import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthsService } from './auths/auths.service';
import { jwtConstants } from './auths/constants';
import Entities from './database/entities';
import { Resolvers, Services } from '.';
import { JwtStrategy } from './auths/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature(Entities),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [AuthsService, ...Resolvers, ...Services, JwtStrategy],
  exports: [AuthsService],
})
export class RepoModule {}
