import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { Folder } from '../folder/folder.entity';

@ObjectType()
@Entity({ name: 'user' })
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Field()
  @Column({ name: 'user_name', length: 50 })
  userName: string;

  @Field()
  @Column({ name: 'login', unique: true, length: 15 })
  login: string;

  @Field()
  @Column({ name: 'password', length: 60 })
  password: string;

  @Field({ nullable: true })
  @Column({ name: 'photo', nullable: true, default: '' })
  photo?: string;

  @Field({ nullable: true })
  @Column({ name: 'type', nullable: true, default: '' })
  type?: string;

  @Field({ nullable: true })
  @Column({ name: 'status', nullable: true })
  status?: boolean;

  @Field(() => [Folder])
  folders: Folder[];
}
