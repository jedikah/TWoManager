import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';

import { PaginationMeta } from '../types';
import { Client } from './client.entity';

@InputType()
export class ClientAddInput extends PartialType(
  OmitType(Client, ['user']),
  InputType,
) {
  @Field({ nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  domicile?: string;

  @Field({ nullable: true })
  contact?: string;
}

@InputType()
export class ClientUpdateInput extends PartialType(
  OmitType(Client, ['user']),
  InputType,
) {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  domicile?: string;

  @Field({ nullable: true })
  contact?: string;
}

@InputType()
export class ClientSearchInput {
  @Field()
  clientName: string;
}

@InputType()
export class ClientsFilterInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  domicile?: string;

  @Field({ nullable: true })
  contact?: string;
}

@InputType()
export class ClientsSearchFilterInput {
  @Field({ defaultValue: '' })
  name?: string;

  @Field({ nullable: true })
  limit?: number;
}

@ObjectType()
export class ClientsResult {
  @Field(() => [Client])
  clients: Client[];

  @Field(() => PaginationMeta)
  paginationMeta: PaginationMeta;
}
