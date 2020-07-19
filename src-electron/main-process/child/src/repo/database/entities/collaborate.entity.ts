import { TableName } from '../TableName';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: TableName.Collaborate })
export class CollaborateEntity {
  @Field()
  @PrimaryGeneratedColumn()
  clientId: number;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  createdAt: Date;

  @Field()
  @Column()
  updatedAt: Date;
}
