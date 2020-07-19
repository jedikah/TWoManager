import { TableName } from '../TableName';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
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
  @PrimaryGeneratedColumn({ name: 'folder_Id' })
  folderId: number;

  @Field()
  @Column({ name: 'user_Id' })
  userId: number;

  @Field()
  @Column({ name: 'client_Id' })
  clientId: number;

  @Field()
  @Column({ name: 'facture_Id' })
  factureId: number;

  @Field()
  @Column({ name: 'register' })
  register: string;

  @Field()
  @Column({ name: 'num_Title' })
  numTitle: string;

  @Field()
  @Column({ name: 'ground_Name' })
  groundName: string;

  @Field()
  @Column({ name: 'localisation_Trav' })
  localisationTrav: string;

  @Field()
  @Column({ name: 'fokontany' })
  fokontany: string;

  @Field()
  @Column({ name: 'date_Trav' })
  dateTrav: Date;

  @Field()
  @Column({ name: 'type_Trav' })
  typeTrav: string;

  @Field()
  @Column({ name: 'price' })
  price: number;

  @ManyToOne(type => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(type => ClientEntity)
  @JoinColumn()
  client: ClientEntity;

  @ManyToOne(type => FactureEntity)
  @JoinColumn()
  facture: FactureEntity;
}
