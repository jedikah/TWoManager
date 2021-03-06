import { TypeTrav } from './typetrav.entity';
import { Field, InputType, OmitType, PartialType } from "@nestjs/graphql";

@InputType()
export class TypeTravAddInput extends PartialType(OmitType(TypeTrav, ['model', 'typeTravId']), InputType) {
    @Field()
    label: string;

    @Field({nullable: true})
    modelId?: number;
}

@InputType()
export class TypeTravUpdateInput extends PartialType(OmitType(TypeTrav, ['model']), InputType) {
    @Field()
    typeTravId: number;

    @Field()
    label: string;

    @Field({nullable: true})
    modelId?: number;
}