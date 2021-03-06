import { Field, InputType, OmitType, PartialType } from "@nestjs/graphql";
import { Cause } from "./cause.entity";

@InputType()
export class CauseAddInput extends PartialType(OmitType(Cause, ['pv', 'causeId']), InputType) {
    @Field()
    pvId: number;

    @Field()
    numero: number;

    @Field()
    name: string

    @Field({ defaultValue: ''})
    domicile: string

    @Field({defaultValue: ''})
    role: 'propriétaire' | 'aquérant'
}

@InputType()
export class CauseUpdateInput extends PartialType(OmitType(Cause, ['pv']), InputType) {
    @Field()
    causeId: number

    @Field()
    pvId: number;

    @Field()
    numero: number;

    @Field()
    name: string

    @Field({defaultValue: ''})
    domicile: string

    @Field({defaultValue: ''})
    role: 'propriétaire' | 'aquérant'
}


@InputType()
export class CauseByPvInput {
    
    @Field()
    pvId: number;
}