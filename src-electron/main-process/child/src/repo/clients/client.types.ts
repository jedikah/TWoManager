import { Field, InputType, ObjectType, ID, Int } from '@nestjs/graphql';

@InputType()
export class ClientInput {
  @Field(() => ID, { nullable: true })
  clientId?: number;

  @Field()
  clientName: string;

  @Field({ nullable: true })
  domicile: string;

  @Field({ nullable: true })
  contact: string;
}
