import { TableName } from '../TableName';
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { FolderEntity } from './folder.entity';
import { PvEntity } from './pv.entity';

@ObjectType()
@Entity({ name: TableName.Convocation })
export class ConvocationEntity {
  @Field(() => ID)
  @PrimaryColumn({ name: 'register_Num' })
  registerNum: number;

  @Field()
  @Column({ name: 'folder_Id' })
  folderId: number;

  @Field()
  @Column({ name: 'pv_Num' })
  pvNum: number;

  @Field()
  @Column({ name: 'nom_Pers_Conv' })
  nomPersConv: string;

  @Field()
  @Column({ name: 'convoke_On' })
  convokeOn: Date;

  @Field()
  @Column({ name: 'at_Town' })
  atTown: string;

  @Field()
  @Column({ name: 'at_Time' })
  atTime: string;

  @Field()
  @Column({ name: 'requisition_Num' })
  requisitionNum: string;

  @ManyToOne(type => FolderEntity)
  @JoinColumn()
  folder: FolderEntity;

  @ManyToOne(type => PvEntity)
  @JoinColumn()
  pv: PvEntity;
}
