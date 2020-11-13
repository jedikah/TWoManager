import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../user/user.types';
import dateNow from '../../utils/dateFormat';
import { Folder } from '../../folder/folder.entity';
import { Pv } from '../../pv/pv.entity';
import { PvServices } from '../pv.service';
import { PvAddInput } from '../pv.types';
import { FolderServices } from '../../folder/folder.service';

@Resolver(() => Pv)
export class AddPv {
  constructor(
    private pvServices: PvServices,
    private folderService: FolderServices,
  ) {}

  @Mutation(() => Pv)
  @UseGuards(GqlAuthGuard)
  async addPv(
    @Args('input')
    input: PvAddInput,
  ): Promise<Pv> {
    const folder = await this.folderService.FolderById(input.folderId);
    const pv = new Pv();

    if (folder) {
      Object.assign<Pv, Partial<Pv>>(pv, {
        cause: input.cause,
        attachments: input.attachments,
        commune: input.commune,
        district: input.district,
        region: input.region,
        folder,
      });
    } else
      throw new HttpException(
        "Le dossier associé à ce PV n'existe pas encore.",
        HttpStatus.NOT_ACCEPTABLE,
      );

    return this.pvServices.addPv(pv);
  }
}
