import { TableName } from '../TableName';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { ClientEntity } from './client.entity';
import { UserEntity } from './user.entity';
import { FactureEntity } from './facture.entity';
import { ConvocationEntity } from './convocation.entity';
@ObjectType()
@Entity({ name: TableName.Folder })
export class FolderEntity {
  @Field()
  @PrimaryGeneratedColumn()
  folderId: number;

  @Field()
  @Column()
  userId: number;

  @Field()
  @Column()
  clientId: number;

  @Field()
  @Column()
  factureId: number;

  @Field()
  @Column()
  Register: string;

  @Field()
  @Column()
  numTitle: string;

  @Field()
  @Column()
  groundName: string;

  @Field()
  @Column()
  localisationTrav: string;

  @Field()
  @Column()
  fokontany: string;

  @Field()
  @Column()
  dateTrav: Date;

  @Field()
  @Column()
  typeTrav: string;

  @Field()
  @Column()
  price: number;

  @ManyToOne(
    type => UserEntity,
    user => user.folders,
  )
  user: UserEntity;

  @ManyToOne(
    type => ClientEntity,
    client => client.folders,
  )
  client: ClientEntity;

  @ManyToOne(
    type => FactureEntity,
    facture => facture.folders,
  )
  facture: FactureEntity;

  @OneToMany(
    type => ConvocationEntity,
    convocation => convocation.folder,
  )
  convovations: ConvocationEntity[];
}
