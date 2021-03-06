import { Justificative } from './../justificative.entity';
import { PvServices } from './../../pv/pv.service';
import { Resolver, Mutation, Args, } from "@nestjs/graphql";
import {  HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { JustificativeUpdateInput } from '../justificative.type';
import { JustificativeServices } from '../justificative.service';


@Resolver()
export class UpdateJustificative{
    constructor(
        private justificativeServices: JustificativeServices,
        private pvServices: PvServices
    ) {}

    @Mutation(() => Justificative)
    @UseGuards(GqlAuthGuard)
    async updateJustificative(
        @Args('input') input: JustificativeUpdateInput
    ): Promise<Justificative> {

        const pv = await this.pvServices.pvById(input.pvId)

        if(!pv)
        throw new HttpException(
            "Ce Pv n'existe pas encore.",
            HttpStatus.NOT_FOUND,
          );

        const justificative = await this.justificativeServices.getJustificativeById(input.justificativeId)

        Object.assign<Justificative, Partial<Justificative>>(justificative, {
            justificativeId: input.justificativeId,
            numero: input.numero,
            content: input.content,
            pv
        })

        return await this.justificativeServices.updateJustificative(justificative)
    }
}