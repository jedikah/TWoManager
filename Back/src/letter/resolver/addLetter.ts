import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { Letter } from '../letter.entity';
import { LetterServices } from '../letter.service';
import { LetterAddInput } from '../letter.type';
import { FolderServices } from '../../folder/folder.service';

@Resolver(() => Letter)
export class AddLetter {
  constructor(
    private folderServicess: FolderServices,
    private lettersServices: LetterServices,
  ) {}

  @Mutation(() => Letter)
  @UseGuards(GqlAuthGuard)
  async addLetter(@Args('input') input: LetterAddInput): Promise<Letter> {
    const folder = await this.folderServicess.FolderById(input.folderId);
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
