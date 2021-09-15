import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

import { Model } from '../model/model.entity';

@ObjectType()
@Entity({ name: 'type_trav' })
export class TypeTrav {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Field()
  @Column({ name: 'label', length: 30 })
  label: string;

  @OneToOne(() => Model, { nullable: true })
  @Field(() => Model, { nullable: true })
  @JoinColumn({ name: 'model_id' })
  model: Model;
  @RelationId((typeTrav: TypeTrav) => typeTrav.model)
  modelId?: number;
}
