import { Justificative } from './justificative.entity';
import { Field, InputType, OmitType, PartialType } from "@nestjs/graphql";
;

@InputType()
export class JustificativeAddInput extends PartialType(OmitType(Justificative, ['pv', 'justificativeId']), InputType) {
    @Field()
    pvId: number;

    @Field()
    numero: number;

    @Field({defaultValue: ''})
    content: string
}

@InputType()
export class JustificativeUpdateInput extends PartialType(OmitType(Justificative, ['pv']), InputType) {
    @Field()
    justificativeId: number

    @Field()
    pvId: number;

    @Field()
    numero: number;

    @Field({defaultValue: ''})
    content: string
}


@InputType()
export class JustificativeByPvInput {
    @Field()
    pvId: number;
}