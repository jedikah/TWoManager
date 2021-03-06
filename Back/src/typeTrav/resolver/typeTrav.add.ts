import { TypeTravAddInput } from './../typetrav.type';
import { TypeTrav } from './../typetrav.entity';
import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { TypeTravServices } from "../typetrav.service";
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { CurrentUser } from '../../auths/currentUser';
import { UserOutput } from '../../user/user.types';

@Resolver()
export class AddTypeTrav {
    constructor(
        private typeTravServices: TypeTravServices
    ){}

    @Mutation(() => TypeTrav)
    @UseGuards(GqlAuthGuard)
    async addTypeTrav(
        @CurrentUser() currentUser: UserOutput,
        @Args('input') input: TypeTravAddInput
    ): Promise<TypeTrav> {

        if(currentUser.type != 'Administrateur')
        throw new HttpException(
            "Consulter l'administrateur pour effectuer cette action.",
            HttpStatus.NOT_ACCEPTABLE,
          );

        const typetrav = new TypeTrav()

        Object.assign<TypeTrav, Partial<TypeTrav>>(typetrav, {
            label: input.label,
            modelId: input.modelId
        })

        return await this.typeTravServices.addTypeTrav(typetrav)
    }

}