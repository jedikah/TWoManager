import {
  Field,
  InputType,
  ObjectType,
  ID,
  Int,
  PartialType,
} from '@nestjs/graphql';
import { Client } from './client.entity';

@InputType()
export class ClientAddInput extends PartialType(Client, InputType) {
  @Field(() => ID, { nullable: true })
  clientId?: number;

  @Field()
  clientName: string;

  @Field({ nullable: true })
  domicile: string;

  @Field({ nullable: true })
  contact: string;
}

@InputType()
export class ClientUpdateInput extends PartialType(Client, InputType) {
  @Field(() => ID)
  clientId: number;

  @Field()
  clientName: string;

  @Field({ nullable: true })
  domicile: string;

  @Field({ nullable: true })
  contact: string;
}
