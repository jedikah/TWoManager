import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { Pv } from './pv.entity';

@InputType()
export class PvAddInput extends PartialType(
  OmitType(Pv, ['folder', 'id']),
  InputType,
) {
  @Field({ nullable: true })
  folderId?: number;

  @Field({ defaultValue: '' })
  pvMere?: string;

  @Field({ defaultValue: '' })
  commune?: string;

  @Field({ defaultValue: '' })
  district?: string;

  @Field({ defaultValue: '' })
  region?: string;
}

@InputType()
export class PvUpdateInput extends PartialType(
  OmitType(Pv, ['folder']),
  InputType,
) {
  @Field()
  id: number;

  @Field({ nullable: true })
  folderId?: number;

  @Field({ defaultValue: '' })
  pvMere?: string;

  @Field({ defaultValue: '' })
  commune?: string;

  @Field({ defaultValue: '' })
  district?: string;

  @Field({ defaultValue: '' })
  region?: string;
}

@InputType()
export class PvByFolderInput {
  @Field()
  folderId: number;
}
