import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

import { Model } from '../model/model.entity';
import { Pv } from '../pv/pv.entity';

@ObjectType()
@Entity({ name: 'convocation' })
export class Convocation {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Field()
  @Column({ name: 'num_register', unique: true })
  numRegister: number;

  @Field()
  @Column({ name: 'name_pers_conv', length: 35 })
  namePersConv: string;

  @Field()
  @Column({ name: 'convoke_on', type: 'datetime' })
  convokeOn: Date;

  @Field()
  @Column({ name: 'at_town', length: 20, default: '' })
  atTown: string;

  @Field()
  @Column({ name: 'num_requisition', length: 8, default: '' })
  numRequisition: string;

  @ManyToOne(() => Pv)
  @Field(() => Pv, { nullable: true })
  @JoinColumn({ name: 'pv_id' })
  pv: Pv;
  @RelationId((convocation: Convocation) => convocation.pv)
  pvId: number;

  @OneToOne(() => Model, { nullable: true })
  @Field(() => Model, { nullable: true })
  @JoinColumn({ name: 'model_id' })
  model: Model;
  @RelationId((convocation: Convocation) => convocation.model)
  modelId?: number;
}
