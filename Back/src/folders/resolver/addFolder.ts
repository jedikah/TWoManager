import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../users/users.types';
import { FolderEntity } from '../folder.entity';
import { FoldersService } from '../folders.service';
import { FolderAddInput } from '../folder.types';
import { ClientsService } from '../../clients/clients.service';
import { UsersService } from '../../users/users.service';

@Resolver(of => FolderEntity)
export class AddFolder {
  constructor(
    private foldersServices: FoldersService,
    private clientsServices: ClientsService,
    private usersServices: UsersService,
  ) {}

  @Mutation(() => FolderEntity)
  @UseGuards(GqlAuthGuard)
  async addFolder(
    @CurrentUser() currentUser: UserOutput,
    @Args('input') input: FolderAddInput,
  ): Promise<FolderEntity> {
    const client = await this.clientsServices.getClientById(input.clientId);
    const user = await this.usersServices.getUserByLogin(currentUser.login);
    const newFolder = new FolderEntity();

    if (client) {
      Object.assign<FolderEntity, Partial<FolderEntity>>(newFolder, {
        user,
        client,
        register: input.register,
        numTitle: input.numTitle,
        groundName: input.groundName,
        localisationTrav: input.localisationTrav,
        fokontany: input.fokontany,
        dateTrav: input.dateTrav,
        typeTrav: input.typeTrav,
        price: input.price,
        clientId: input.clientId,
      });
    } else
      throw new HttpException(
        "Ce client n'existe pas.",
        HttpStatus.NOT_ACCEPTABLE,
      );

    return await this.foldersServices.addFolder(newFolder);
  }
}
