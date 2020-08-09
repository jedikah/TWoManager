import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthsService } from '../auths/auths.service';
import { jwtConstants } from '../auths/constants';
import { ClientEntity } from '../database/entities';
import { JwtStrategy } from '../auths/jwt.strategy';
import { ClientsResolver } from '../clients/resolvers';
import { ClientsService } from '../clients/clients.service';
import { CollaboratesModule } from './index';
import { CollaborationsService } from '../collaborations/collaborations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),
    forwardRef(() => CollaboratesModule),
  ],
  providers: [...ClientsResolver, ClientsService],
  exports: [...ClientsResolver, ClientsService],
})
export class ClientModule {}
