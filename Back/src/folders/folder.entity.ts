import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { TableName } from '../utils/TableName';
import { ClientEntity } from '../clients/client.entity';
import { UserEntity } from '../users/user.entity';
import { FactureEntity } from '../factures/facture.entity';

@ObjectType()
@Entity({ name: TableName.Folder })
export class FolderEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'folder_id' })
  folderId: number;

  @Field()
  @Column({ name: 'register' })
  register: string;

  @Field({ nullable: true })
  @Column({ name: 'num_title', nullable: true })
  numTitle: string;

  @Field()
  @Column({ name: 'ground_name' })
  groundName: string;

  @Field()
  @Column({ name: 'localisation_trav' })
  localisationTrav: string;

  @Field()
  @Column({ name: 'fokontany' })
  fokontany: string;

  @Field()
  @Column({ name: 'date_trav' })
  dateTrav: Date;

  @Field()
  @Column({ name: 'type_trav' })
  typeTrav: string;

  @Field({ nullable: true })
  @Column({ name: 'price', nullable: true })
  price: number;

  @ManyToOne(() => UserEntity)
  @Field(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  @RelationId((folder: FolderEntity) => folder.user)
  userId: number;

  @ManyToOne(() => ClientEntity)
  @Field(() => ClientEntity)
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;
  @RelationId((folder: FolderEntity) => folder.client)
  clientId: number;

  @ManyToOne(() => FactureEntity, { nullable: true })
  @Field(() => FactureEntity, { nullable: true })
  @JoinColumn({ name: 'facture_id' })
  facture: FactureEntity;
  @RelationId((folder: FolderEntity) => folder.facture)
  factureId?: number;
}
