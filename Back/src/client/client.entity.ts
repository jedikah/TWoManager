import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from '../user/user.entity';

@ObjectType()
@Entity({ name: 'client' })
export class Client {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Field()
  @Column({ name: 'name', length: 50 })
  name: string;

  @Field({ nullable: true })
  @Column({ name: 'domicile', length: 50, default: '' })
  domicile?: string;

  @Field({ nullable: true })
  @Column({ name: 'contact', length: 10, unique: true, default: '' })
  contact?: string;

  @ManyToOne(() => User)
  @Field()
  @JoinColumn({ name: 'user_id' })
  user: User;
  @RelationId((client: Client) => client.user)
  userId: number;
}
