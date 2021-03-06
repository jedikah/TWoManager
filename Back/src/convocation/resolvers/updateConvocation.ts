import { ModelServices } from './../../model/model.service';
import { PvServices } from './../../pv/pv.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { Convocation } from '../convocation.entity';
import { ConvocationServices } from '../convocation.service';
import { ConvocationUpdateInput } from '../convocation.types';

@Resolver(() => Convocation)
export class UpdateConvocation {
  constructor(
    private convocationServices: ConvocationServices,
    private pvServices: PvServices,
    private modelServices: ModelServices
  ) {}

  @Mutation(() => Convocation)
  @UseGuards(GqlAuthGuard)
  async updateConvocation(
    @Args('input')
    input: ConvocationUpdateInput,
  ): Promise<Convocation> {

    const pv = await this.pvServices.pvById(input.pvId);

    if(!pv)
    throw new HttpException(
      "Pv introuvable.",
      HttpStatus.NOT_FOUND,
    );
    
    const model = await this.modelServices.getModelById(input.modelId);

    const convocation = await this.convocationServices.getConvocationById(input.convocationId);

    if(!convocation)
    throw new HttpException(
      "Convocation introuvable.",
      HttpStatus.NOT_FOUND,
    );

    Object.assign<Convocation, Partial<Convocation>>(convocation, {
      convocationId: input.convocationId,
      numRegister: input.numRegister,
      namePersConv: input.namePersConv,
      atTown: input.atTown,
      convokeOn: input.convokeOn,
      numRequisition: input.numRequisition,
      model,
       pv
      });

    return this.convocationServices.addConvocation(convocation);
  }
}
