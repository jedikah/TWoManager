import { ModelServices } from './../../model/model.service';
import { PvServices } from './../../pv/pv.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { Convocation } from '../convocation.entity';
import { ConvocationServices } from '../convocation.service';
import { ConvocationAddInput } from '../convocation.types';

@Resolver(() => Convocation)
export class AddConvocation {
  constructor(
    private convocationServices: ConvocationServices,
    private pvServices: PvServices,
    private modelServices: ModelServices
  ) {}

  @Mutation(() => Convocation)
  @UseGuards(GqlAuthGuard)
  async addConvocation(
    @Args('input')
    input: ConvocationAddInput,
  ): Promise<Convocation> {
    const pv = await this.pvServices.pvById(input.pvId);

    if(!pv)
    throw new HttpException(
      "Pv introuvable.",
      HttpStatus.NOT_FOUND,
    );
    
    const model = await this.modelServices.getModelById(input.modelId);

    console.log(model)

    const newConvocation = new Convocation();

    Object.assign<Convocation, Partial<Convocation>>(newConvocation, {
      numRegister: input.numRegister,
      namePersConv: input.namePersConv,
      atTown: input.atTown,
      convokeOn: input.convokeOn,
      numRequisition: input.numRequisition,
      model,
       pv
      });

    return this.convocationServices.addConvocation(newConvocation);
  }
}
