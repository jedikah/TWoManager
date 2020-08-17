import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { TableName } from '../TableName';

@ObjectType()
@Entity({ name: TableName.Pv })
export class PvEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'num_pv' })
  numPv: number;

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
