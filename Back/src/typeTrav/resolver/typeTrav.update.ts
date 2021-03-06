import { TypeTravUpdateInput } from './../typetrav.type';
import { TypeTrav } from './../typetrav.entity';
import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { TypeTravServices } from "../typetrav.service";
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { CurrentUser } from '../../auths/currentUser';
import { UserOutput } from '../../user/user.types';

@Resolver()
export class UpdateTypeTrav {
    constructor(
        private typeTravServices: TypeTravServices
    ){}

    @Mutation(() => TypeTrav)
    @UseGuards(GqlAuthGuard)
    async updateTypeTrav(
        @CurrentUser() currentUser: UserOutput,
        @Args('input') input: TypeTravUpdateInput
    ): Promise<TypeTrav> {
        if(currentUser.type != 'Administrateur')
        throw new HttpException(
            "Consulter l'administrateur pour effectuer cette action.",
            HttpStatus.NOT_ACCEPTABLE,
          );

        const typetrav = await this.typeTravServices.typetravById(input.typeTravId)

        if(typetrav)
        Object.assign<TypeTrav, Partial<TypeTrav>>(typetrav, {
            typeTravId: input.typeTravId,
            label: input.label,
        })

        return await this.typeTravServices.addTypeTrav(typetrav)
    }

}