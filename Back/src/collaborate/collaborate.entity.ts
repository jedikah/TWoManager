import { Entity, Column, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../user/user.entity';
import { Client } from '../client/client.entity';

@ObjectType()
@Entity({ name: 'collaborate' })
export class Collaborate {
  @Field()
  @Column({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @RelationId((collaboration: Collaborate) => collaboration.user)
  userId: number;

  @Field(() => Client)
  @ManyToOne(() => Client, { primary: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;
  @RelationId((collaboration: Collaborate) => collaboration.client)
  clientId: number;
}
