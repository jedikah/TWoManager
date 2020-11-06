import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'pv' })
export class Pv {
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
