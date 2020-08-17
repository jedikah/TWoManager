import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { TableName } from '../TableName';

@ObjectType()
@Entity({ name: TableName.Client })
export class ClientEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'client_id' })
  clientId: number;

  @Field()
  @Column({ name: 'client_name' })
  clientName: string;

  @Field({ nullable: true })
  @Column({ name: 'domicile' })
  domicile: string;

  @Field({ nullable: true })
  @Column({ name: 'contact' })
  contact: string;
}
