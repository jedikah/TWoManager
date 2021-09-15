import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { PvServices } from '../../pv/pv.service';
import { Cause } from '../cause.entity';
import { CauseServices } from '../cause.service';
import { CauseUpdateInput } from '../cause.type';

@Resolver()
export class UpdateCause {
  constructor(
    private causeServices: CauseServices,
    private pvServices: PvServices,
  ) {}

  @Mutation(() => Cause)
  @UseGuards(GqlAuthGuard)
  async updateCause(@Args('input') input: CauseUpdateInput): Promise<Cause> {
    const pv = await this.pvServices.pvById(input.pvId);

    if (!pv) throw new HttpException('Pv introuvable.', HttpStatus.NOT_FOUND);

    const cause = await this.causeServices.getCauseById(input.id);

    Object.assign<Cause, Partial<Cause>>(cause, {
      id: input.id,
      numero: input.numero,
      name: input.name,
      domicile: input.domicile,
      role: input.role,
      pv,
    });

    return await this.causeServices.updateCause(cause);
  }
}
