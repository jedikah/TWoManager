import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

import { Pv } from '../pv/pv.entity';

@ObjectType()
@Entity({ name: 'justificative' })
export class Justificative {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Field()
  @Column({ name: 'numero', nullable: false })
  numero: number;

  @Field()
  @Column({ name: 'content', length: 40, default: '' })
  content: string;

  @ManyToOne(() => Pv)
  @Field()
  @JoinColumn({ name: 'pv_id' })
  pv: Pv;
  @RelationId((Justificative: Justificative) => Justificative.pv)
  pvId: number;
}
