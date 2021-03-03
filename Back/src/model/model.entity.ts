import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'model' })
export class Model {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'model_id' })
  modelId: number;

  @Field()
  @Column({ name: 'label', default: '', length: 20 })
  label: string;

  @Field({ nullable: true })
  @Column({ name: 'content', type: 'longtext' })
  content?: string;
}
