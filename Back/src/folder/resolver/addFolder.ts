import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../user/user.types';
import { Folder } from '../folder.entity';
import { FolderServices } from '../folder.service';
import { FolderAddInput } from '../folder.types';
import { ClientServices } from '../../client/client.service';
import { UserService } from '../../user/user.service';

@Resolver(of => Folder)
export class AddFolder {
  constructor(
    private folderServicess: FolderServices,
    private clientServicess: ClientServices,
    private userServices: UserService,
  ) {}

  @Mutation(() => Folder)
  @UseGuards(GqlAuthGuard)
  async addFolder(
    @CurrentUser() currentUser: UserOutput,
    @Args('input') input: FolderAddInput,
  ): Promise<Folder> {
    const client = await this.clientServicess.getClientById(input.clientId);
    const user = await this.userServices.getUserByLogin(currentUser.login);
    const newFolder = new Folder();

    if (client) {
      Object.assign<Folder, Partial<Folder>>(newFolder, {
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
        "Ce dossier n'existe pas.",
        HttpStatus.NOT_ACCEPTABLE,
      );

    return await this.folderServicess.addFolder(newFolder);
  }
}
