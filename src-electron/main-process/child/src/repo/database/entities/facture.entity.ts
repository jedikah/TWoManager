import { TableName } from '../TableName';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { FolderEntity } from './folder.entity';

@ObjectType()
@Entity({ name: TableName.Facture })
export class FactureEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'facture_Id' })
  factureId: number;

  @Field()
  @Column({ name: 'date_Facture' })
  dateFacture: Date;
}
