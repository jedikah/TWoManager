import { TableName } from '../TableName';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { FolderEntity } from './folder.entity';

@ObjectType()
@Entity({ name: TableName.Facture })
export class FactureEntity {
  @Field()
  @PrimaryGeneratedColumn()
  factureId: number;

  @Field()
  @Column()
  dateFacture: Date;

  @OneToMany(
    type => FolderEntity,
    folder => folder.facture,
  )
  folders: FolderEntity[];
}
