import { UsersModule } from './users/users.module';
import { PvModule } from './pvs/pvs.module';
import { LetterModule } from './letters/letters.module';
import { FoldersModule } from './folders/folders.module';
import { FacturesModule } from './factures/facturs.module';
import { ConvocationsModule } from './convocations/convocations.module';
import { CollaborationsModule } from './collaborations/collaborations.module';
import { ClientsModule } from './clients/clients.module';
import { AuthsModule } from './auths/auths.module';

export {
  UsersModule,
  PvModule,
  LetterModule,
  FoldersModule,
  FacturesModule,
  ConvocationsModule,
  CollaborationsModule,
  ClientsModule,
  AuthsModule,
};

const Modules = [
  PvModule,
  UsersModule,
  LetterModule,
  FoldersModule,
  FacturesModule,
  ConvocationsModule,
  CollaborationsModule,
  ClientsModule,
  AuthsModule,
];

export default Modules;
