import { JustificativeServices } from './../justificative.service';
import { PvServices } from './../../pv/pv.service';
import { Resolver, Query, Args } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { JustificativeByPvInput } from '../justificative.type';
import { Justificative } from '../justificative.entity';

@Resolver()
export class JustificativeByPv {
    constructor(
        private justificativeServices: JustificativeServices,
        private pvServices: PvServices
    ){}

    @Query(() => [Justificative])
    @UseGuards(GqlAuthGuard)
    async justificativeByPv(
        @Args('input') input: JustificativeByPvInput
    ): Promise<Justificative[]> {

        const pv = await this.pvServices.pvById(input.pvId)
        

        return await this.justificativeServices.getJustificativeByPv(pv)
    }
}