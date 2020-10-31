import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { LetterEntity } from './letter.entity';

@InputType()
export class LetterAddInput extends PartialType(
  OmitType(LetterEntity, ['folder']),
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
  createdAt: Date;

  @Field()
  object: string;
}
