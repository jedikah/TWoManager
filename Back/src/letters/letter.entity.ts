import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { TableName } from '../utils/TableName';
import { FolderEntity } from '../folders/folder.entity';

@ObjectType()
@Entity({ name: TableName.Letter })
export class LetterEntity {
  @Field()
  @PrimaryColumn({ name: 'num_rtx' })
  numRtx: string;

  @Field()
  @Column({ name: 'date_rtx' })
  dateRtx: Date;

  @Field()
  @Column({ name: 'letter_town' })
  letterTown: string;

  @Field()
  @Column({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column({ name: 'object' })
  object: string;

  @OneToOne(() => FolderEntity, { nullable: true })
  @Field(() => FolderEntity, { nullable: true })
  @JoinColumn({ name: 'folder_id' })
  folder: FolderEntity;
  @RelationId((letter: LetterEntity) => letter.folder)
  folderId?: number;
}
