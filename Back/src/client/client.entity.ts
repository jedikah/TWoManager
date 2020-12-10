import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'client' })
export class Client {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'client_id' })
  clientId: number;

  @Field()
  @Column({ name: 'client_name', length: 35 })
  clientName: string;

  @Field({ nullable: true })
  @Column({ name: 'domicile', length: 50, nullable: true })
  domicile: string;

  @Field({ nullable: true })
  @Column({ name: 'contact', length: 10, unique: true, nullable: true })
  contact: string;
}
