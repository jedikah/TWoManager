import { TableName } from '../TableName';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

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
}
