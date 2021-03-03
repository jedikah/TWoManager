import { Resolver, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

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

  @Query(() => [Pv])
  @UseGuards(GqlAuthGuard)
  async pvByFolder(
    @Args('input')
    input: PvByFolderInput,
  ): Promise<Pv[]> {
    const folder = await this.folderService.FolderById(input.folderId);
    return await this.pvServices.pvByFolder(folder);
  }
}
