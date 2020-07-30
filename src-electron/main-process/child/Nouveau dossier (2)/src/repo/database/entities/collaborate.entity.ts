import { TableName } from '../TableName';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: TableName.Collaborate })
export class CollaborateEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'client_Id' })
  clientId: number;

  @Field()
  @Column({ name: 'user_Id' })
  userId: string;

  @Field()
  @Column({ name: 'created_At' })
  createdAt: Date;

  @Field()
  @Column({ name: 'updated_At' })
  updatedAt: Date;
}
