import { Resolver, Query, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../user/user.types';
import { Folder } from '../folder.entity';
import { FolderServices } from '../folder.service';
import { FoldersFilterInput, FoldersResult } from '../folder.types';
import { ClientServices } from '../../client/client.service';
import { UserService } from '../../user/user.service';
import { PaginationInput } from '../../types';
import { SelectQueryBuilder } from 'typeorm';

@Resolver(of => Folder)
export class UserFolders {
  constructor(
    private folderServicess: FolderServices,
    private clientServicess: ClientServices,
    private userServices: UserService,
  ) {}

  @Query(() => FoldersResult)
  @UseGuards(GqlAuthGuard)
  async userFolders(
    @CurrentUser() currentUser: UserOutput,
    @Args('paginationInput') paginationInput: PaginationInput,
    @Args('foldersFilterInput') foldersFilterInput: FoldersFilterInput,
  ): Promise<FoldersResult> {
    const getUser = await this.userServices.getUserByLogin(currentUser.login);

    if (!getUser)
      throw new HttpException(
        "Vous n'êtes pas connecté.",
        HttpStatus.NOT_ACCEPTABLE,
      );

    let register = '',
      numTitle = '',
      groundName = '';

    foldersFilterInput.register
      ? (register = foldersFilterInput.register)
      : (register = '');
    foldersFilterInput.numTitle
      ? (numTitle = foldersFilterInput.numTitle)
      : (numTitle = '');
    foldersFilterInput.groundName
      ? (groundName = foldersFilterInput.groundName)
      : (groundName = '');

    const request: SelectQueryBuilder<Folder> = this.folderServicess.foldersByUser(
      {
        userId: getUser.userId,
        register,
        numTitle,
        groundName,
      },
    );

    const paginateFolders = await this.folderServicess.paginate(
      request,
      paginationInput,
    );

    return {
      folders: paginateFolders.items,
      paginationMeta: paginateFolders.meta,
    };
  }
}
