import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'client' })
export class Client {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'client_id' })
  clientId: number;

  @Field()
  @Column({ name: 'client_name' })
  clientName: string;

  @Field({ nullable: true })
  @Column({ name: 'domicile' })
  domicile: string;

  @Field({ nullable: true })
  @Column({ name: 'contact' })
  contact: string;
}
