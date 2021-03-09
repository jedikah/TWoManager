import { InputType, PartialType, OmitType, Field } from '@nestjs/graphql';
import { Model } from './model.entity';

@InputType()
export class ModelAddInput extends PartialType(OmitType(Model, ['modelId']), InputType) {
    @Field({defaultValue: ''})
    name?: string;

    @Field({defaultValue: ''})
    label?: string;

    @Field({defaultValue: ''})
    content?: string;
}

@InputType()
export class ModelUpdateInput extends PartialType(Model, InputType) {
    @Field()
    modelId: number;

    @Field({defaultValue: ''})
    name?: string;

    @Field({defaultValue: ''})
    label?: string;

    @Field({defaultValue: ''})
    content?: string;
}

@InputType()
export class ModelFilterInput {
    @Field({defaultValue: ''})
    label?: string;

    @Field({defaultValue: ''})
    name?: string;
}
