import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

import { Folder } from '../folder/folder.entity';
import { Model } from '../model/model.entity';

@ObjectType()
@Entity({ name: 'letter' })
export class Letter {
  @Field()
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

  @OneToOne(() => Model, { nullable: true })
  @Field(() => Folder, { nullable: true })
  @JoinColumn({ name: 'model_id' })
  model: Model;
  @RelationId((letter: Letter) => letter.model)
  modelId?: number;
}
