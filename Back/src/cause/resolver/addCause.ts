import { PvServices } from './../../pv/pv.service';
import { CauseServices } from './../cause.service';
import { Resolver, Mutation, Args, } from "@nestjs/graphql";
import {  HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { Cause } from '../cause.entity';
import { CauseAddInput } from '../cause.type';


@Resolver()
export class AddCause {
    constructor(
        private causeServices: CauseServices,
        private pvServices: PvServices
    ) {}

    @Mutation(() => Cause)
    @UseGuards(GqlAuthGuard)
    async addCause(
        @Args('input') input: CauseAddInput
    ): Promise<Cause> {

        const pv = await this.pvServices.pvById(input.pvId)

        if(!pv)
        throw new HttpException(
            "Pv introuvable.",
            HttpStatus.NOT_FOUND,
          );

        const cause = new Cause()

        Object.assign<Cause, Partial<Cause>>(cause, {
            numero: input.numero,
            name: input.name,
            domicile: input.domicile,
            role: input.role,
            pv
        })

        return await this.causeServices.addCause(cause)
    }
}