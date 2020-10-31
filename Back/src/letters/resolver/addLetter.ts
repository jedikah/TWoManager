import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../users/users.types';
import { ClientsService } from '../../clients/clients.service';
import { UsersService } from '../../users/users.service';
import { LetterEntity } from '../letter.entity';
import { LettersService } from '../letters.service';
import { LetterAddInput } from '../letter.type';
import { FoldersService } from '../../folders/folders.service';

@Resolver(of => LetterEntity)
export class AddLetter {
  constructor(
    private foldersServices: FoldersService,
    private lettersServices: LettersService,
  ) {}

  @Mutation(() => LetterEntity)
  @UseGuards(GqlAuthGuard)
  async addLetter(@Args('input') input: LetterAddInput): Promise<LetterEntity> {
    const folder = await this.foldersServices.FolderById(input.folderId);
    const newLetter = new LetterEntity();

    if (folder) {
      Object.assign<LetterEntity, Partial<LetterEntity>>(newLetter, {
        numRtx: input.numRtx,
        dateRtx: input.dateRtx,
        letterTown: input.letterTown,
        createdAt: input.createdAt,
        object: input.object,
        folder,
      });
    } else
      throw new HttpException(
        "Ce dossier n'existe pas.",
        HttpStatus.NOT_ACCEPTABLE,
      );

    return await this.lettersServices.addLetter(newLetter);
  }
}
