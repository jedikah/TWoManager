import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { TypeTrav } from './typetrav.entity';

@InputType()
export class TypeTravAddInput extends PartialType(
  OmitType(TypeTrav, ['model', 'id']),
  InputType,
) {
  @Field()
  label: string;

  @Field({ nullable: true })
  modelId?: number;
}

@InputType()
export class TypeTravUpdateInput extends PartialType(
  OmitType(TypeTrav, ['model']),
  InputType,
) {
  @Field()
  id: number;

  @Field()
  label: string;

  @Field({ nullable: true })
  modelId?: number;
}
