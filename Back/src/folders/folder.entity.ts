import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { Client } from '../clients/client.entity';
import { User } from '../users/user.entity';
import { Facture } from '../factures/facture.entity';

@ObjectType()
@Entity({ name: 'folder' })
export class Folder {
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

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @RelationId((folder: Folder) => folder.user)
  userId: number;

  @ManyToOne(() => Client)
  @Field(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;
  @RelationId((folder: Folder) => folder.client)
  clientId: number;

  @ManyToOne(() => Facture, { nullable: true })
  @Field(() => Facture, { nullable: true })
  @JoinColumn({ name: 'facture_id' })
  facture: Facture;
  @RelationId((folder: Folder) => folder.facture)
  factureId?: number;
}
