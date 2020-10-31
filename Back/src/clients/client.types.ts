import {
  Field,
  InputType,
  ObjectType,
  ID,
  Int,
  PartialType,
} from '@nestjs/graphql';
import { ClientEntity } from './client.entity';

@InputType()
export class ClientAddInput extends PartialType(ClientEntity, InputType) {
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
export class ClientUpdateInput extends PartialType(ClientEntity, InputType) {
  @Field(() => ID)
  clientId: number;

  @Field()
  clientName: string;

  @Field({ nullable: true })
  domicile: string;

  @Field({ nullable: true })
  contact: string;
}
