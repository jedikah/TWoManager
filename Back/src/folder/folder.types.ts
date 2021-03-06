import {
  Field,
  ID,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { PaginationMeta } from '../types';
import { Folder } from './folder.entity';

@InputType()
export class FolderUpdateInput extends PartialType(
  OmitType(Folder, ['client', 'facture', 'user', 'typeTrav']),
  InputType,
) {
  @Field(() => ID)
  folderId: number;
  
  @Field({ nullable: true })
  factureId?: number;

  @Field({ nullable: true})
  typeTravId?: number

  @Field({defaultValue: ''})
  register?: string;

  @Field({ nullable: true })
  numTitle?: string;

  @Field({defaultValue: ''})
  groundName?: string;

  @Field({defaultValue: ''})
  localisationTrav?: string;

  @Field({defaultValue: ''})
  fokontany?: string;

  @Field()
  dateTrav: Date;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  userId?: number;

  @Field({nullable: true})
  clientId?: number;

}

@InputType()
export class FolderAddInput extends PartialType(
  OmitType(Folder, ['client', 'facture', 'user', 'userId', 'typeTrav', 'folderId']),
  InputType,
) {
  @Field({ nullable: true })
  factureId?: number;

  @Field({ nullable: true})
  typeTravId?: number

  @Field({defaultValue: ''})
  register?: string;

  @Field({ nullable: true })
  numTitle?: string;

  @Field({defaultValue: ''})
  groundName?: string;

  @Field({defaultValue: ''})
  localisationTrav?: string;

  @Field({defaultValue: ''})
  fokontany?: string;

  @Field({ nullable: true })
  dateTrav?: Date;

  @Field({ nullable: true })
  price?: number;

  @Field()
  clientId: number;

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
  @Field(() => [Folder])
  folders: Folder[];

  @Field(() => PaginationMeta)
  paginationMeta: PaginationMeta;
}
