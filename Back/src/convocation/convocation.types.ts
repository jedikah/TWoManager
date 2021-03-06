import { Field, InputType, PartialType, OmitType } from '@nestjs/graphql';
import { Convocation } from './convocation.entity';

@InputType()
export class ConvocationAddInput extends PartialType(
  OmitType(Convocation, ['pv', 'model', 'convocationId'], InputType)
) {
  @Field()
  numRegister: number;

  @Field()
  namePersConv: string;

  @Field()
  convokeOn: Date;

  @Field({defaultValue: ''})
  atTown: string;

  @Field({defaultValue: ''})
  numRequisition: string;

  @Field()
  pvId: number

  @Field({nullable: true})
  modelId?: number
}

@InputType()
export class ConvocationUpdateInput extends PartialType(
  OmitType(Convocation, ['pv', 'model'], InputType)
) {
  @Field()
  convocationId: number;

  @Field()
  numRegister: number;

  @Field()
  namePersConv: string;

  @Field()
  convokeOn: Date;

  @Field({defaultValue: ''})
  atTown: string;

  @Field({defaultValue: ''})
  numRequisition: string;

  @Field()
  pvId: number

  @Field({nullable: true})
  modelId?: number
}

@InputType()
export class ConvocationFilterInput {
  @Field()
  pvId: number;  
}
