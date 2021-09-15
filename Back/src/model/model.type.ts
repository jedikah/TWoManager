import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { Model } from './model.entity';

@InputType()
export class ModelAddInput extends PartialType(
  OmitType(Model, ['id']),
  InputType,
) {
  @Field({ defaultValue: '' })
  name?: string;

  @Field({ defaultValue: '' })
  label?: string;

  @Field({ defaultValue: '' })
  content?: string;
}

@InputType()
export class ModelUpdateInput extends PartialType(Model, InputType) {
  @Field()
  id: number;

  @Field({ defaultValue: '' })
  name?: string;

  @Field({ defaultValue: '' })
  label?: string;

  @Field({ defaultValue: '' })
  content?: string;
}

@InputType()
export class ModelFilterInput {
  @Field({ defaultValue: '' })
  label?: string;

  @Field({ defaultValue: '' })
  name?: string;
}
