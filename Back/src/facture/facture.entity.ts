import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'facture' })
export class Facture {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Field()
  @Column({ name: 'date_facture' })
  dateFacture: number;
}
