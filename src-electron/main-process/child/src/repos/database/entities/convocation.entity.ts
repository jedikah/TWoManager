import { TableName } from '../TableName';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { FolderEntity } from './folder.entity';
import { PvEntity } from './pv.entity';

@ObjectType()
@Entity({ name: TableName.Convocation })
export class ConvocationEntity {
  @Field()
  @PrimaryGeneratedColumn()
  registerNum: number;

  @Field()
  @Column()
  folderId: number;

  @Field()
  @Column()
  pvNum: number;

  @Field()
  @Column()
  nomPersConv: string;

  @Field()
  @Column()
  convokeOn: Date;

  @Field()
  @Column()
  AtTown: string;

  @Field()
  @Column()
  atTime: string;

  @Field()
  @Column()
  requisitionNum: string;

  @ManyToOne(
    type => FolderEntity,
    folder => folder.convovations,
  )
  folder: FolderEntity;

  @OneToOne(type => PvEntity)
  @JoinColumn()
  pv: PvEntity;
}
