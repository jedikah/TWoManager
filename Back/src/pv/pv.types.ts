import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Pv } from './pv.entity';

@InputType()
export class PvAddInput extends PartialType(
  OmitType(Pv, ['folder', 'pvId', 'model']),
  InputType,
) {
  @Field()
  folderId: number;
}

@InputType()
export class PvByFolderInput {
  @Field()
  folderId: number;
}
