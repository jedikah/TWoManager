import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthsService } from '../auths/auths.service';
import { jwtConstants } from '../auths/constants';
import { CollaborateEntity } from '../database/entities';
import { JwtStrategy } from '../auths/jwt.strategy';
import { ClientModule } from './index';
import { CollaborationsService } from '../collaborations/collaborations.service';
import { ResolverResolver } from '../collaborations/resolver/resolver.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollaborateEntity]),
    forwardRef(() => ClientModule),
  ],
  providers: [ResolverResolver, CollaborationsService],
  exports: [CollaborationsService],
})
export class CollaboratesModule {}
