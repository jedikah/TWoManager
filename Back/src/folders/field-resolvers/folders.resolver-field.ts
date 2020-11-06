import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Client } from '../../clients/client.entity';
import { ClientsService } from '../../clients/clients.service';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { Folder } from '../folder.entity';

@Resolver(() => Folder)
export class FoldersFieldResolver {
  constructor(
    private userServices: UsersService,
    private clientServices: ClientsService,
  ) {}

  @ResolveField(() => Client)
  async client(@Root() folder: Folder): Promise<Client> {
    return this.clientServices.getClientById(folder.clientId);
  }

  @ResolveField(() => User)
  async user(@Root() folder: Folder): Promise<User> {
    return this.userServices.getUserById(folder.userId);
  }
}
