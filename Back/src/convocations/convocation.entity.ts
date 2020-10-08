import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { TableName } from '../utils/TableName';
import { FolderEntity } from '../folders/folder.entity';
import { PvEntity } from '../pvs/pv.entity';

@ObjectType()
@Entity({ name: TableName.Convocation })
export class ConvocationEntity {
  @Field(() => ID)
  @PrimaryColumn({ name: 'num_register' })
  numRegister: number;

  @Field()
  @Column({ name: 'name_pers_conv' })
  namePersConv: string;

  @Field()
  @Column({ name: 'convoke_on' })
  convokeOn: Date;

  @Field()
  @Column({ name: 'at_town' })
  atTown: string;

  @Field()
  @Column({ name: 'at_time' })
  atTime: string;

  @Field()
  @Column({ name: 'num_requisition' })
  numRequisition: string;

  @ManyToOne(() => FolderEntity)
  @JoinColumn({ name: 'folder_id' })
  folder: FolderEntity;
  @RelationId((convocation: ConvocationEntity) => convocation.folder)
  folderId: number;

  @ManyToOne(() => PvEntity)
  @JoinColumn({ name: 'num_pv' })
  pv: PvEntity;
  @RelationId((convocation: ConvocationEntity) => convocation.pv)
  numPv: number;
}
