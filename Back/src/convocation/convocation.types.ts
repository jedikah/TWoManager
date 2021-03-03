import { Field, InputType } from '@nestjs/graphql';
import { Convocation } from './convocation.entity';

@InputType()
export class ConvocationAddInput implements Partial<Convocation> {
  @Field()
  numRegister: number;

  @Field()
  namePersConv: string;

  @Field()
  convokeOn: Date;

  @Field()
  atTown: string;

  @Field()
  numRequisition: string;

  @Field()
  folderId: number;
}
