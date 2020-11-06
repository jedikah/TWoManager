import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { Letter } from '../letter.entity';
import { LetterServices } from '../letter.service';
import { LetterUpdateInput } from '../letter.type';
import { FolderServices } from '../../folder/folder.service';

@Resolver(() => Letter)
export class UpdateLetter {
  constructor(
    private folderServicess: FolderServices,
    private lettersServices: LetterServices,
  ) {}

  @Mutation(() => Letter)
  @UseGuards(GqlAuthGuard)
  async updateLetter(@Args('input') input: LetterUpdateInput): Promise<Letter> {
    const folder = await this.folderServicess.FolderById(input.folderId);
    const newLetter = new Letter();
    const letter = await this.lettersServices.getLetterByFolder(folder);

    if (folder) {
      Object.assign<Letter, Partial<Letter>>(newLetter, {
        numRtx: input.numRtx,
        dateRtx: input.dateRtx,
        letterTown: input.letterTown,
        object: input.object,
        folder,
      });
      letter.numRtx = input.numRtx;
      letter.dateRtx = input.dateRtx;
      letter.letterTown = input.letterTown;
      letter.object = input.object;
    } else
      throw new HttpException(
        "Le dossier associé à cette lettre n'existe pas encore.",
        HttpStatus.NOT_ACCEPTABLE,
      );

    return await this.lettersServices.updateLetter(letter);
  }
}
