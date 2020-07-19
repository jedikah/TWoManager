import { TableName } from '../TableName';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: TableName.Pv })
export class PvEntity {
  @Field()
  @PrimaryGeneratedColumn({ name: 'pv_Num' })
  pvNum: number;

  @Field()
  @Column({ name: 'attachments' })
  attachments: string;

  @Field()
  @Column({ name: 'commune' })
  commune: string;

  @Field()
  @Column({ name: 'district' })
  district: string;

  @Field()
  @Column({ name: 'region' })
  region: string;
}
