import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { TableName } from '../utils/TableName';

@ObjectType()
@Entity({ name: TableName.Facture })
export class FactureEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'facture_id' })
  factureId: number;

  @Field()
  @Column({ name: 'date_facture' })
  dateFacture: Date;
}
