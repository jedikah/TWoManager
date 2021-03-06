import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Letter } from './letter.entity';

@InputType()
export class LetterAddInput extends PartialType(
  OmitType(Letter, ['folder', 'model']),
  InputType,
) {
  @Field()
  numRtx: string;

  @Field()
  folderId: number;

  @Field()
  dateRtx: Date;

  @Field()
  letterTown: string;

  @Field()
  object: string;
}

@InputType()
export class LetterUpdateInput extends LetterAddInput {}
