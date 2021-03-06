import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, RelationId } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Model } from '../model/model.entity';

@ObjectType()
@Entity({ name: 'type_trav' })
export class TypeTrav {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'type_trav_id' })
  typeTravId: number;

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
