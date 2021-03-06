import { Resolver, Args, Query } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { Pv } from '../pv.entity';
import { PvServices } from '../pv.service';
import { PvByFolderInput } from '../pv.types';
import { FolderServices } from '../../folder/folder.service';

@Resolver(() => Pv)
export class PvByfolder {
  constructor(
    private pvServices: PvServices,
    private folderService: FolderServices,
  ) {}

  @Query(() => Pv)
  @UseGuards(GqlAuthGuard)
  async pvByFolder(
    @Args('input')
    input: PvByFolderInput,
  ): Promise<Pv | null> {
    
    const folder = await this.folderService.FolderById(input.folderId);

    if(!folder)
    throw new HttpException(
      "La liste des dossier est vide.",
      HttpStatus.NOT_FOUND,
    );

    const pv = await this.pvServices.pvByFolder(folder);

    if(!pv)
    throw new HttpException(
      "La PV correspondant à ce dossier n'existet pas encore.",
      HttpStatus.NOT_FOUND,
    );
    
    return pv
  }
}
