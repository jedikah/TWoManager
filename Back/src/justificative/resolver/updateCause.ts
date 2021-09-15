import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { PvServices } from '../../pv/pv.service';
import { Justificative } from '../justificative.entity';
import { JustificativeServices } from '../justificative.service';
import { JustificativeUpdateInput } from '../justificative.type';

@Resolver()
export class UpdateJustificative {
  constructor(
    private justificativeServices: JustificativeServices,
    private pvServices: PvServices,
  ) {}

  @Mutation(() => Justificative)
  @UseGuards(GqlAuthGuard)
  async updateJustificative(
    @Args('input') input: JustificativeUpdateInput,
  ): Promise<Justificative> {
    const pv = await this.pvServices.pvById(input.pvId);

    if (!pv)
      throw new HttpException(
        "Ce Pv n'existe pas encore.",
        HttpStatus.NOT_FOUND,
      );

    const justificative = await this.justificativeServices.getJustificativeById(
      input.id,
    );

    Object.assign<Justificative, Partial<Justificative>>(justificative, {
      id: input.id,
      numero: input.numero,
      content: input.content,
      pv,
    });

    return await this.justificativeServices.updateJustificative(justificative);
  }
}
