import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'client' })
export class Client {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'client_id' })
  clientId: number;

  @Field()
  @Column({ name: 'client_name', length: 50 })
  clientName: string;

  @Field({ nullable: true })
  @Column({ name: 'domicile', length: 50, default: '' })
  domicile?: string;

  @Field({ nullable: true })
  @Column({ name: 'contact', length: 10, unique: true })
  contact?: string;
}
