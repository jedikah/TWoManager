import {
  Field,
  ID,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { PaginationMeta } from '../types';
import { FolderEntity } from './folder.entity';

@InputType()
export class FolderUpdateInput extends PartialType(
  OmitType(FolderEntity, ['client', 'facture', 'user']),
  InputType,
) {
  @Field(() => ID)
  folderId: number;

  @Field()
  register: string;

  @Field({ nullable: true })
  numTitle?: string;

  @Field()
  groundName: string;

  @Field()
  localisationTrav: string;

  @Field()
  fokontany: string;

  @Field()
  dateTrav: Date;

  @Field()
  typeTrav: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  userId?: number;

  @Field()
  clientId: number;

  @Field({ nullable: true })
  factureId?: number;
}

@InputType()
export class FolderAddInput extends PartialType(
  OmitType(FolderEntity, ['client', 'facture', 'user']),
  InputType,
) {
  @Field(() => ID, { nullable: true })
  folderId?: number;

  @Field()
  register: string;

  @Field({ nullable: true })
  numTitle?: string;

  @Field()
  groundName: string;

  @Field()
  localisationTrav: string;

  @Field()
  fokontany: string;

  @Field()
  dateTrav: Date;

  @Field()
  typeTrav: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  userId?: number;

  @Field()
  clientId: number;

  @Field({ nullable: true })
  factureId?: number;
}

@InputType()
export class FoldersFilterInput {
  @Field({ nullable: true })
  register?: string;

  @Field({ nullable: true })
  numTitle?: string;

  @Field({ nullable: true })
  groundName?: string;
}

@ObjectType()
export class FoldersResult {
  @Field(() => [FolderEntity])
  folders: FolderEntity[];

  @Field(() => PaginationMeta)
  paginationMeta: PaginationMeta;
}
