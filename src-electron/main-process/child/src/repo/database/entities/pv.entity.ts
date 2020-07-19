import { TableName } from '../TableName';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: TableName.Pv })
export class PvEntity {
  @Field()
  @PrimaryGeneratedColumn()
  pvNum: number;

  @Field()
  @Column()
  attachments: string;

  @Field()
  @Column()
  commune: string;

  @Field()
  @Column()
  district: string;

  @Field()
  @Column()
  region: string;
}
