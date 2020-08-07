import { TableName } from '../TableName';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  JoinColumn,
  RelationId,
  PrimaryColumn,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { UserEntity, ClientEntity } from './index';

@ObjectType()
@Entity({ name: TableName.Collaborate })
export class CollaborateEntity {
  @Field()
  @Column({ name: 'created_At' })
  createdAt: Date;

  @Field()
  @Column({ name: 'updated_At' })
  updatedAt: Date;

  @Field(type => UserEntity)
  @ManyToOne(type => UserEntity, { primary: true })
  @JoinColumn({ name: 'user_Id' })
  user: UserEntity;
  @RelationId((collaboration: CollaborateEntity) => collaboration.user)
  userId: number;

  @Field(type => ClientEntity)
  @ManyToOne(type => ClientEntity, { primary: true })
  @JoinColumn({ name: 'client_Id' })
  client: ClientEntity;
  @RelationId((collaboration: CollaborateEntity) => collaboration.client)
  clientId: number;
}
