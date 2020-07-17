import { TableName } from '../TableName';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: TableName.Client })
export class clientEntity {
  @Field()
  @PrimaryGeneratedColumn()
  clientId: number;

  @Field()
  @Column()
  clientName: string;

  @Field()
  @Column()
  domicile: string;

  @Field()
  @Column()
  contact: string;
}
