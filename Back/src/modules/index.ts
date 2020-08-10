import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auths/auth.module';
import { ClientModule } from '../clients/clients.module';
import { CollaboratesModule } from '../collaborations/collaborates.module';

const modules = [UsersModule, AuthModule, ClientModule, CollaboratesModule];

export { modules };
