import { TableName } from '../TableName';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { FolderEntity } from './folder.entity';

@ObjectType()
@Entity({ name: TableName.Letter })
export class LetterEntity {
  @Field()
  @PrimaryColumn({ name: 'rtx_Num' })
  rtxNum: string;

  @Field()
  @Column({ name: 'folder_Id' })
  folderId: number;

  @Field()
  @Column({ name: 'date_Rtx' })
  dateRtx: Date;

  @Field()
  @Column({ name: 'letter_Town' })
  letterTown: string;

  @Field()
  @Column({ name: 'created_At' })
  createdAt: Date;

  @Field()
  @Column({ name: 'object' })
  object: string;

  @OneToOne(type => FolderEntity)
  @JoinColumn()
  folder: FolderEntity;
}
