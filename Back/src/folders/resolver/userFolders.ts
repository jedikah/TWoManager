import { Resolver, Query, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../users/users.types';
import { FolderEntity } from '../folder.entity';
import { FoldersService } from '../folders.service';
import { FoldersFilterInput, FoldersResult } from '../folder.types';
import { ClientsService } from '../../clients/clients.service';
import { UsersService } from '../../users/users.service';
import { PaginationInput } from '../../types';
import { SelectQueryBuilder } from 'typeorm';

@Resolver(of => FolderEntity)
export class UserFolders {
  constructor(
    private foldersServices: FoldersService,
    private clientsServices: ClientsService,
    private usersServices: UsersService,
  ) {}

  @Query(() => FoldersResult)
  @UseGuards(GqlAuthGuard)
  async userFolders(
    @CurrentUser() currentUser: UserOutput,
    @Args('paginationInput') paginationInput: PaginationInput,
    @Args('foldersFilterInput') foldersFilterInput: FoldersFilterInput,
  ): Promise<FoldersResult> {
    const user = await this.usersServices.getUserByLogin(currentUser.login);

    if (!user)
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

    const request: SelectQueryBuilder<FolderEntity> = this.foldersServices.foldersByUser(
      {
        userId: user.userId,
        register,
        numTitle,
        groundName,
      },
    );

    const paginateFolders = await this.foldersServices.paginate(
      request,
      paginationInput,
    );

    return {
      folders: paginateFolders.items,
      paginationMeta: paginateFolders.meta,
    };
  }
}
