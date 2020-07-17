import { TableName } from '../TableName';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: TableName.Facture })
export class FactureEntity {
  @Field()
  @PrimaryGeneratedColumn()
  factureId: number;

  @Field()
  @Column()
  dateFacture: Date;
}
