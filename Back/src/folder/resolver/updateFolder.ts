import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../user/user.types';
import { Folder } from '../folder.entity';
import { FolderServices } from '../folder.service';
import { FolderUpdateInput } from '../folder.types';
import { ClientServices } from '../../client/client.service';
import { UserService } from '../../user/user.service';
import { TypeTravServices } from '../../typeTrav/typetrav.service';

@Resolver(of => Folder)
export class UpdateFolder {
  constructor(
    private folderServices: FolderServices,
    private clientServices: ClientServices,
    private userServices: UserService,
    private typeTravServices: TypeTravServices
  ) {}

  @Mutation(() => Folder)
  @UseGuards(GqlAuthGuard)
  async updateFolder(
    @CurrentUser() currentUser: UserOutput,
    @Args('input') input: FolderUpdateInput,
  ): Promise<Folder> {
    const user = await this.userServices.getUserByLogin(currentUser.login);
    const client = await this.clientServices.getClientById(input.clientId);

    if (!client) 
    throw new HttpException(
      "Ce dossier n'existe pas.",
      HttpStatus.NOT_ACCEPTABLE,
    );

    const typeTrav = await this.typeTravServices.typetravById(input.typeTravId)

    if (!typeTrav)
    throw new HttpException(
      "Le type de dossier introuvable.",
      HttpStatus.NOT_FOUND,
    ); 

    const folder = await this.folderServices.FolderById(input.folderId)
      Object.assign<Folder, Partial<Folder>>(folder, {
        user,
        client,
        typeTrav,
        register: input.register,
        numTitle: input.numTitle,
        groundName: input.groundName,
        localisationTrav: input.localisationTrav,
        fokontany: input.fokontany,
        dateTrav: input.dateTrav,
        price: input.price,
        clientId: input.clientId,
      });


    return await this.folderServices.updateFolder(folder);
  }
}
