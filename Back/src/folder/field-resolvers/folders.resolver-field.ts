import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Client } from '../../client/client.entity';
import { ClientServices } from '../../client/client.service';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { Folder } from '../folder.entity';

@Resolver(() => Folder)
export class FoldersFieldResolver {
  constructor(
    private userServices: UserService,
    private clientServices: ClientServices,
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
