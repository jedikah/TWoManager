import { TableName } from '../TableName';
import { Entity, Column, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { UserEntity } from '../users/user.entity';
import { ClientEntity } from '../clients/client.entity';

@ObjectType()
@Entity({ name: TableName.Collaborate })
export class CollaborateEntity {
  @Field()
  @Column({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  @RelationId((collaboration: CollaborateEntity) => collaboration.user)
  userId: number;

  @Field(() => ClientEntity)
  @ManyToOne(() => ClientEntity, { primary: true })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;
  @RelationId((collaboration: CollaborateEntity) => collaboration.client)
  clientId: number;
}
