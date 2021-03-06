import { ModelAddInput } from './../model.type';
import { Model } from './../model.entity';
import { ModelServices } from './../model.service';
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';


@Resolver()
export class AddModel {
    constructor(
        private modelServices: ModelServices
    ) {}

    @Mutation(() => Model)
    @UseGuards(GqlAuthGuard)
    async addModel(
        @Args('input') input: ModelAddInput
    ): Promise<Model> {

        const model = new Model()

        Object.assign<Model, Partial<Model>>(model, {
            label: input.label,
            content: input.content
        })

        return await this.modelServices.addModel(model)
    }
    
}