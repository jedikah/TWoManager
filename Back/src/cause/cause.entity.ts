import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, RelationId, ManyToOne } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Pv } from '../pv/pv.entity';

@ObjectType()
@Entity({ name: 'cause' })
export class Cause {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'cause_id' })
  causeId: number;

  @Field()
  @Column({ name: 'numero'})
  numero: number

  @Field()
  @Column({name: 'name', length: 40, default: ''})
  name: string

  @Field({nullable: true})
  @Column({name: 'domicile', length: 40, default: ''})
  domicile?: string

  @Field({nullable: true})
  @Column({name: 'role', length: 12, default: ''})
  role?: 'propriétaire' | 'aquérant'

  @ManyToOne(() => Pv)
  @Field({nullable: true})
  @JoinColumn({name: 'pv_id'})
  pv: Pv
  @RelationId((cause: Cause) => cause.pv)
  pvId: number

}
