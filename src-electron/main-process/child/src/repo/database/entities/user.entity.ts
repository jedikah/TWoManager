import { TableName } from '../TableName';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { ClientEntity } from './client.entity';
import { FolderEntity } from './folder.entity';

@ObjectType()
@Entity({ name: TableName.User })
export class UserEntity {
  @Field()
  @PrimaryGeneratedColumn()
  userId: number;

  @Field()
  @Column()
  userName: string;

  @Field()
  @Column()
  login: string;

  @Field()
  @Column()
  password: string;

  @ManyToMany(type => ClientEntity)
  @JoinTable()
  categories: ClientEntity[];

  @OneToMany(
    type => FolderEntity,
    folder => folder.user,
  )
  folders: FolderEntity[];
}
