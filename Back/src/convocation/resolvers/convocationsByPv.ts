import { PvServices } from './../../pv/pv.service';
import { ConvocationServices } from './../convocation.service';
import { Resolver, Query, Args } from "@nestjs/graphql";
import {  HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { Convocation } from '../convocation.entity';
import { ConvocationFilterInput } from '../convocation.types';

@Resolver()
export class ConvocationsByPv {
    constructor(
        private convocationServices: ConvocationServices,
        private pvServices: PvServices
    ) {}

    @Query(() => [Convocation])
    @UseGuards(GqlAuthGuard)
    async convocationsByPv(
        @Args('input') input: ConvocationFilterInput
    ): Promise<Convocation[]> {

        const pv = await this.pvServices.pvById(input.pvId)

        if(!pv)
        throw new HttpException(
            "Pv introuvable.",
            HttpStatus.NOT_FOUND,
          );

        return await this.convocationServices.getConvocationsByPv(pv)
    }
}