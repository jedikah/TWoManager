import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { Justificative } from './justificative.entity';

@InputType()
export class JustificativeAddInput extends PartialType(
  OmitType(Justificative, ['pv', 'id']),
  InputType,
) {
  @Field()
  pvId: number;

  @Field()
  numero: number;

  @Field({ defaultValue: '' })
  content: string;
}

@InputType()
export class JustificativeUpdateInput extends PartialType(
  OmitType(Justificative, ['pv']),
  InputType,
) {
  @Field()
  id: number;

  @Field()
  pvId: number;

  @Field()
  numero: number;

  @Field({ defaultValue: '' })
  content: string;
}

@InputType()
export class JustificativeByPvInput {
  @Field()
  pvId: number;
}
