import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId, JoinColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from '../user/user.entity';

@ObjectType()
@Entity({ name: 'client' })
export class Client {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'client_id' })
  clientId: number;

  @Field()
  @Column({ name: 'name', length: 50 })
  name: string;

  @Field({ nullable: true })
  @Column({ name: 'domicile', length: 50, default: '' })
  domicile?: string;

  @Field({ nullable: true })
  @Column({ name: 'contact', length: 10, unique: true, default: ''  })
  contact?: string;

  @ManyToOne(() => User)
  @Field()
  @JoinColumn({name: 'user_id'})
  user: User
  @RelationId((client: Client) => client.user)
  userId: number
}
