import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../users/users.types';
import { ClientsService } from '../../clients/clients.service';
import { UsersService } from '../../users/users.service';
import { Letter } from '../letter.entity';
import { LettersService } from '../letters.service';
import { LetterAddInput } from '../letter.type';
import { FoldersService } from '../../folders/folders.service';

@Resolver(of => Letter)
export class AddLetter {
  constructor(
    private foldersServices: FoldersService,
    private lettersServices: LettersService,
  ) {}

  @Mutation(() => Letter)
  @UseGuards(GqlAuthGuard)
  async addLetter(@Args('input') input: LetterAddInput): Promise<Letter> {
    const folder = await this.foldersServices.FolderById(input.folderId);
    const newLetter = new Letter();

    if (folder) {
      Object.assign<Letter, Partial<Letter>>(newLetter, {
        numRtx: input.numRtx,
        dateRtx: input.dateRtx,
        letterTown: input.letterTown,
        // createdAt: input.createdAt,
        object: input.object,
        folder,
      });
    } else
      throw new HttpException(
        "Le dossier associé à cette lettre n'existe pas encore.",
        HttpStatus.NOT_ACCEPTABLE,
      );

    return await this.lettersServices.addLetter(newLetter);
  }
}
