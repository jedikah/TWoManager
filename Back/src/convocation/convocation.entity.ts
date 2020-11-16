import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  RelationId,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { Folder } from '../folder/folder.entity';

@ObjectType()
@Entity({ name: 'convocation' })
export class Convocation {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Field()
  @Column({ name: 'num_register' })
  numRegister: number;

  @Field()
  @Column({ name: 'name_pers_conv', length: 35 })
  namePersConv: string;

  @Field()
  @Column({ name: 'convoke_on', type: 'datetime' })
  convokeOn: Date;

  @Field()
  @Column({ name: 'at_town', length: 20 })
  atTown: string;

  @Field()
  @Column({ name: 'num_requisition', length: 8 })
  numRequisition: string;

  @ManyToOne(() => Folder)
  @JoinColumn({ name: 'folder_id' })
  folder: Folder;
  @RelationId((convocation: Convocation) => convocation.folder)
  folderId: number;
}
