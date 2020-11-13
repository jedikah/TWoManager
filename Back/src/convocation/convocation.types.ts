import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Convocation } from './convocation.entity';

@InputType()
export class ConvocationAddInput extends PartialType(
  OmitType(Convocation, ['id', 'pv', 'folder']),
  InputType,
) {
  @Field()
  numRegister: number;

  @Field()
  namePersConv: string;

  @Field()
  convokeOn: number;

  @Field()
  atTown: string;

  @Field()
  numRequisition: string;

  @Field()
  folderId: number;

  @Field()
  numPv: number;
}
