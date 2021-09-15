import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../user/user.types';
import { TypeTrav } from '../typetrav.entity';
import { TypeTravServices } from '../typetrav.service';
import { TypeTravUpdateInput } from '../typetrav.type';

@Resolver()
export class UpdateTypeTrav {
  constructor(private typeTravServices: TypeTravServices) {}

  @Mutation(() => TypeTrav)
  @UseGuards(GqlAuthGuard)
  async updateTypeTrav(
    @CurrentUser() currentUser: UserOutput,
    @Args('input') input: TypeTravUpdateInput,
  ): Promise<TypeTrav> {
    if (currentUser.type != 'Administrateur')
      throw new HttpException(
        "Consulter l'administrateur pour effectuer cette action.",
        HttpStatus.NOT_ACCEPTABLE,
      );

    const typetrav = await this.typeTravServices.typetravById(input.id);

    if (typetrav)
      Object.assign<TypeTrav, Partial<TypeTrav>>(typetrav, {
        id: input.id,
        label: input.label,
      });

    return await this.typeTravServices.addTypeTrav(typetrav);
  }
}
