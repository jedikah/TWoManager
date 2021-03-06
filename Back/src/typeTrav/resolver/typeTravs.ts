import { TypeTrav } from './../typetrav.entity';
import { Resolver, Query } from "@nestjs/graphql";
import { TypeTravServices } from "../typetrav.service";
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';

@Resolver()
export class TypeTravs {
    constructor(
        private typeTravServices: TypeTravServices
    ){}

    @Query(() => [TypeTrav])
    @UseGuards(GqlAuthGuard)
    async typeTravs(): Promise<TypeTrav[]> {
        return this.typeTravServices.typetravs()
    }

}