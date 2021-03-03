import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  RelationId,
  ManyToOne,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Folder } from '../folder/folder.entity';
import { Letter } from '../letter/letter.entity';
import { Model } from '../model/model.entity';

@ObjectType()
@Entity({ name: 'pv' })
export class Pv {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'pv_Id' })
  pvId: number;

  @Field({ nullable: true })
  @Column({ name: 'type_pv', length: 30, nullable: true, default: '' })
  typePv?: string;

  @Field({ nullable: true })
  @Column({ name: 'pv_mere', length: 40, nullable: true, default: '' })
  pvMere?: string;

  @Field({ nullable: true })
  @Column({ name: 'cause_a', length: 50, nullable: true, default: '' })
  causeA?: string;

  @Field({ nullable: true })
  @Column({ name: 'cause_b', length: 50, nullable: true, default: '' })
  causeB?: string;

  @Field({ nullable: true })
  @Column({ name: 'attachments', nullable: true, default: '' })
  attachments?: string;

  @Field({ nullable: true })
  @Column({ name: 'commune', length: 20, nullable: true, default: '' })
  commune?: string;

  @Field({ nullable: true })
  @Column({ name: 'district', length: 20, nullable: true, default: '' })
  district?: string;

  @Field({ nullable: true })
  @Column({ name: 'region', length: 20, nullable: true, default: '' })
  region?: string;

  @ManyToOne(() => Folder, { nullable: true })
  @Field(() => Folder, { nullable: true })
  @JoinColumn({ name: 'folder_id' })
  folder: Folder;
  @RelationId((pv: Pv) => pv.folder)
  folderId?: number;

  @ManyToOne(() => Model, { nullable: true })
  @Field(() => Model, { nullable: true })
  @JoinColumn({ name: 'model_id' })
  model: Model;
  @RelationId((pv: Pv) => pv.model)
  modelId?: number;
}
