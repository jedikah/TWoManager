import { TableName } from '../TableName';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { FolderEntity } from './folder.entity';

@ObjectType()
@Entity({ name: TableName.User })
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Field()
  @Column({ name: 'user_name' })
  userName: string;

  @Field()
  @Column({ name: 'login', unique: true })
  login: string;

  @Field()
  @Column({ name: 'password' })
  password: string;

  @Field({ nullable: true })
  @Column({ name: 'photo', nullable: true })
  photo?: string;

  @Field({ nullable: true })
  @Column({ name: 'type', nullable: true })
  type?: string;

  @Field({ nullable: true })
  @Column({ name: 'status', nullable: true })
  status?: boolean;

  @Field(() => [FolderEntity])
  folders: FolderEntity[];
}
