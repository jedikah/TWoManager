import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, RelationId, ManyToOne } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Pv } from '../pv/pv.entity';

@ObjectType()
@Entity({ name: 'justificative' })
export class Justificative {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'justificative_id' })
  justificativeId: number;

  @Field()
  @Column({ name: 'numero',  nullable: false })
  numero: number

  @Field()
  @Column({name: 'content', length: 40, default: ''})
  content: string

  @ManyToOne(() => Pv)
  @Field()
  @JoinColumn({name: 'pv_id'})
  pv: Pv
  @RelationId((Justificative: Justificative) => Justificative.pv)
  pvId: number

}
