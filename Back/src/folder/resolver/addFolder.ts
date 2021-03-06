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
import { TypeTravServices } from '../../typeTrav/typetrav.service';

@Resolver(of => Folder)
export class AddFolder {
  constructor(
    private folderServicess: FolderServices,
    private clientServicess: ClientServices,
    private userServices: UserService,
    private typeTravServices: TypeTravServices
  ) {}

  @Mutation(() => Folder)
  @UseGuards(GqlAuthGuard)
  async addFolder(
    @CurrentUser() currentUser: UserOutput,
    @Args('input') input: FolderAddInput,
  ): Promise<Folder> {
    const client = await this.clientServicess.getClientById(input.clientId);
    const user = await this.userServices.getUserByLogin(currentUser.login);

    if (!client)
    throw new HttpException(
      "Dossier de client introuvable.",
      HttpStatus.NOT_FOUND,
    );

    const typeTrav = await this.typeTravServices.typetravById(input.typeTravId)

    if (!typeTrav)
    throw new HttpException(
      "Le type de dossier introuvable.",
      HttpStatus.NOT_FOUND,
    ); 

    const newFolder = new Folder();

      Object.assign<Folder, Partial<Folder>>(newFolder, {
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

    return await this.folderServicess.addFolder(newFolder);
  }
}
