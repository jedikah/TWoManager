import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  RelationId,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { Folder } from '../folders/folder.entity';

@ObjectType()
@Entity({ name: 'letter' })
export class Letter {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Field()
  @Column({ name: 'num_rtx' })
  numRtx: string;

  @Field()
  @Column({ name: 'date_rtx' })
  dateRtx: Date;

  @Field()
  @Column({ name: 'letter_town' })
  letterTown: string;

  @Field()
  @Column({ name: 'object' })
  object: string;

  @OneToOne(() => Folder, { nullable: true })
  @Field(() => Folder, { nullable: true })
  @JoinColumn({ name: 'folder_id' })
  folder: Folder;
  @RelationId((letter: Letter) => letter.folder)
  folderId?: number;
}
