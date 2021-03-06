import { PvServices } from './../../pv/pv.service';
import { CauseServices } from './../cause.service';
import { Resolver, Mutation, Args, } from "@nestjs/graphql";
import {  HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { Cause } from '../cause.entity';
import { CauseUpdateInput } from '../cause.type';


@Resolver()
export class UpdateCause {
    constructor(
        private causeServices: CauseServices,
        private pvServices: PvServices
    ) {}

    @Mutation(() => Cause)
    @UseGuards(GqlAuthGuard)
    async updateCause(
        @Args('input') input: CauseUpdateInput
    ): Promise<Cause> {

        const pv = await this.pvServices.pvById(input.pvId)

        if(!pv)
        throw new HttpException(
            "Pv introuvable.",
            HttpStatus.NOT_FOUND,
          );

        const cause = await this.causeServices.getCauseById(input.causeId)

        Object.assign<Cause, Partial<Cause>>(cause, {
            causeId: input.causeId,
            numero: input.numero,
            name: input.name,
            domicile: input.domicile,
            role: input.role,
            pv
        })

        return await this.causeServices.updateCause(cause)
    }
}