import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Folder } from '../folder/folder.entity';
import { Letter } from '../letter/letter.entity';

@ObjectType()
@Entity({ name: 'pv' })
export class Pv {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'pv_Id' })
  pvId;

  @Field()
  @Column({ name: 'cause', nullable: true })
  cause?: string;

  @Field()
  @Column({ name: 'attachments', nullable: true })
  attachments?: string;

  @Field()
  @Column({ name: 'commune', length: 20, nullable: true })
  commune?: string;

  @Field()
  @Column({ name: 'district', length: 20, nullable: true })
  district?: string;

  @Field()
  @Column({ name: 'region', length: 20, nullable: true })
  region?: string;

  @OneToOne(() => Folder, { nullable: true })
  @Field(() => Folder, { nullable: true })
  @JoinColumn({ name: 'folder_id' })
  folder: Folder;
  @RelationId((letter: Letter) => letter.folder)
  folderId?: number;
}
