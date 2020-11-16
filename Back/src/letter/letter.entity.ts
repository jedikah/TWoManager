import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  RelationId,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Folder } from '../folder/folder.entity';

@ObjectType()
@Entity({ name: 'letter' })
export class Letter {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Field()
  @Column({ name: 'num_rtx', length: 8 })
  numRtx: string;

  @Field()
  @Column({ name: 'date_rtx' })
  dateRtx: Date;

  @Field()
  @Column({ name: 'letter_town', length: 15 })
  letterTown: string;

  @Field()
  @Column({ name: 'object', length: 80 })
  object: string;

  @OneToOne(() => Folder, { nullable: true })
  @Field(() => Folder, { nullable: true })
  @JoinColumn({ name: 'folder_id' })
  folder: Folder;
  @RelationId((letter: Letter) => letter.folder)
  folderId?: number;
}