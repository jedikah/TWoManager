import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { ClientModule } from './clients.module';
import { CollaboratesModule } from './collaborates.module';

const modules = [UsersModule, AuthModule, ClientModule, CollaboratesModule];

export { modules };

export { ClientModule, UsersModule, AuthModule, CollaboratesModule };
