import { TableName } from '../TableName';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: TableName.User })
export class UserEntity {
  @Field()
  @PrimaryGeneratedColumn()
  IdUser: number;

  @Field()
  @Column()
  userName: string;

  @Field()
  @Column()
  login: string;

  @Field()
  @Column()
  password: string;
}
