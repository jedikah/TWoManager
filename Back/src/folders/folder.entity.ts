import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { TableName } from '../TableName';
import { ClientEntity } from '../clients/client.entity';
import { UserEntity } from '../users/user.entity';
import { FactureEntity } from '../factures/facture.entity';

@ObjectType()
@Entity({ name: TableName.Folder })
export class FolderEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'dossier_id' })
  folderId: number;

  @Field()
  @Column({ name: 'register' })
  register: string;

  @Field()
  @Column({ name: 'num_title' })
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

  @Field()
  @Column({ name: 'price' })
  price: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  @RelationId((folder: FolderEntity) => folder.user)
  userId: number;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;
  @RelationId((folder: FolderEntity) => folder.client)
  clientId: number;

  @ManyToOne(() => FactureEntity, { nullable: true })
  @JoinColumn({ name: 'facture_id' })
  facture: FactureEntity;
  @RelationId((folder: FolderEntity) => folder.facture)
  factureId?: number;
}
