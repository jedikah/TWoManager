import { ModelFilterInput } from '../model.type';
import { Model } from '../model.entity';
import { ModelServices } from '../model.service';
import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';


@Resolver()
export class Models {
    constructor(
        private modelServices: ModelServices
    ) {}

    @Query(() => [Model])
    @UseGuards(GqlAuthGuard)
    async models(
        @Args('input') input: ModelFilterInput
    ): Promise<Model[]> {
        return await this.modelServices.getModels(input.label, input.name)
    }
    
}