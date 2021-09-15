import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'model' })
export class Model {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Field()
  @Column({ name: 'name', default: '', length: 25 })
  name: string;

  @Field()
  @Column({ name: 'label', default: '', length: 50 })
  label: string;

  @Field({ nullable: true })
  @Column({ name: 'content', type: 'longtext' })
  content?: string;
}
