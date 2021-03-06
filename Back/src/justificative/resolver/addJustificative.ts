import { Justificative } from './../justificative.entity';
import { JustificativeServices } from './../justificative.service';
import { PvServices } from './../../pv/pv.service';
import { Resolver, Mutation, Args, } from "@nestjs/graphql";
import {  HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { JustificativeAddInput } from '../justificative.type';


@Resolver()
export class AddJustificative {
    constructor(
        private justificatives: JustificativeServices,
        private pvServices: PvServices
    ) {}

    @Mutation(() => Justificative)
    @UseGuards(GqlAuthGuard)
    async addJustificative(
        @Args('input') input: JustificativeAddInput
    ): Promise<Justificative> {

        const pv = await this.pvServices.pvById(input.pvId)

        if(!pv)
        throw new HttpException(
            "Ce Pv n'existe pas encore.",
            HttpStatus.NOT_FOUND,
          );

        const justificative = new Justificative()

        Object.assign<Justificative, Partial<Justificative>>(justificative, {
            numero: input.numero,
            content: input.content,
            pv
        })

        return await this.justificatives.addJustificative(justificative)
    }
}