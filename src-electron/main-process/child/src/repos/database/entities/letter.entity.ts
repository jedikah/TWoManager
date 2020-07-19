import { TableName } from '../TableName';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { FolderEntity } from './folder.entity';

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

  @OneToOne(type => FolderEntity)
  @JoinColumn()
  folder: FolderEntity;
}
