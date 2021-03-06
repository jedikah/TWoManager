import { PvServices } from './../../pv/pv.service';
import { CauseServices } from './../cause.service';
import { Resolver, Query, Args } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { Cause } from '../cause.entity';
import { CauseByPvInput } from '../cause.type';

@Resolver()
export class CauseByPv {
    constructor(
        private causeServices: CauseServices,
        private pvServices: PvServices
    ){}

    @Query(() => [Cause])
    @UseGuards(GqlAuthGuard)
    async causeByPv(
        @Args('input') input: CauseByPvInput
    ): Promise<Cause[]> {

        const pv = await this.pvServices.pvById(input.pvId)
        

        return await this.causeServices.getCauseByPv(pv)
    }
}