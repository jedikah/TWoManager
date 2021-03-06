import { ModelUpdateInput } from './../model.type';
import { Model } from './../model.entity';
import { ModelServices } from './../model.service';
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';


@Resolver()
export class UpdateModel {
    constructor(
        private modelServices: ModelServices
    ) {}

    @Mutation(() => Model)
    @UseGuards(GqlAuthGuard)
    async updateModel(
        @Args('input') input: ModelUpdateInput
    ): Promise<Model> {

        const model = await this.modelServices.getModelById(input.modelId);

        if(!model)
        throw new HttpException(
            "Ce dossier n'existe pas.",
            HttpStatus.NOT_FOUND,
          );

        Object.assign<Model, Partial<Model>>(model, {
            modelId: input.modelId,
            label: input.label,
            content: input.content
        })

        return await this.modelServices.updateModel(model)
    }
    
}