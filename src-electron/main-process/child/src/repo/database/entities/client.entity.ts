import { TableName } from '../TableName';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { FolderEntity } from './folder.entity';

@ObjectType()
@Entity({ name: TableName.Client })
export class ClientEntity {
  @Field()
  @PrimaryGeneratedColumn()
  clientId: number;

  @Field()
  @Column()
  clientName: string;

  @Field()
  @Column()
  domicile: string;

  @Field()
  @Column()
  contact: string;

  @OneToMany(
    type => FolderEntity,
    folder => folder.client,
  )
  folders: FolderEntity[];
}
