import { UsersResolver } from './users/users.resolver';
import { PvsResolver } from './pvs/pvs.resolver';
import { LettersResolver } from './letters/letters.resolver';
import { FoldersResolver } from './folders/folders.resolver';
import { FacturesResolver } from './factures/factures.resolver';
import { ConvocationsResolver } from './convocations/convocations.resolver';
import { CollaborationsResolver } from './collaborations/collaborations.resolver';
import { ClientsResolver } from './clients/clients.resolver';

import { PvsService } from './pvs/pvs.service';
import { LettersService } from './letters/letters.service';
import { FoldersService } from './folders/folders.service';
import { FacturesService } from './factures/factures.service';
import { ConvocationsService } from './convocations/convocations.service';
import { CollaborationsService } from './collaborations/collaborations.service';
import { ClientsService } from './clients/clients.service';
import { AuthsService } from './auths/auths.service';
import { UsersService } from './users/users.service';

export const Resolvers = [
  UsersResolver,
  PvsResolver,
  LettersResolver,
  FoldersResolver,
  FacturesResolver,
  ConvocationsResolver,
  CollaborationsResolver,
  ClientsResolver,
];

export const Services = [
  PvsService,
  LettersService,
  FoldersService,
  FacturesService,
  ConvocationsService,
  CollaborationsService,
  ClientsService,
  AuthsService,
  UsersService,
];

export {
  UsersResolver,
  PvsResolver,
  LettersResolver,
  FoldersResolver,
  FacturesResolver,
  ConvocationsResolver,
  CollaborationsResolver,
  ClientsResolver,
  //
  PvsService,
  LettersService,
  FoldersService,
  FacturesService,
  ConvocationsService,
  CollaborationsService,
  ClientsService,
  AuthsService,
  UsersService,
};
