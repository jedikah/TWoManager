import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { Client } from '../client/client.entity';
import { User } from '../user/user.entity';
import { Facture } from '../facture/facture.entity';
import { TypeTrav } from '../typeTrav/typetrav.entity';

@ObjectType()
@Entity({ name: 'folder' })
export class Folder {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'folder_id' })
  folderId: number;

  @Field()
  @Column({ name: 'register', length: 8, default: '' })
  register: string;

  @Field({ nullable: true })
  @Column({ name: 'num_title', length: 8, default: '' })
  numTitle?: string;

  @Field()
  @Column({ name: 'ground_name', length: 30, default: '' })
  groundName: string;

  @Field()
  @Column({ name: 'localisation_trav', length: 20, default: '' })
  localisationTrav: string;

  @Field()
  @Column({ name: 'fokontany', length: 15, default: '' })
  fokontany: string;

  @Field()
  @Column({ name: 'date_trav',  })
  dateTrav?: Date;

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

  @ManyToOne(() => TypeTrav)
  @Field(() => TypeTrav, {nullable: true})
  @JoinColumn({name: 'type_trav_id'})
  typeTrav: TypeTrav
  @RelationId((folder: Folder) => folder.typeTrav)
  typeTravId: number
}
