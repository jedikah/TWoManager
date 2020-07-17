import { TableName } from '../TableName';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: TableName.Letter })
export class LetterEntity {
  @Field()
  @PrimaryGeneratedColumn()
  rtxNum: number;

  @Field()
  @Column()
  folderId: number;

  @Field()
  @Column()
  dateRtx: Date;

  @Field()
  @Column()
  letterTown: string;

  @Field()
  @Column()
  createdAt: Date;

  @Field()
  @Column()
  object: string;
}
