import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../auths/currentUser';
import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { UserOutput } from '../../user/user.types';
import dateNow from '../../utils/dateFormat';
import { Convocation } from '../convocation.entity';
import { ConvocationServices } from '../convocation.service';
import { ConvocationAddInput } from '../convocation.types';
import { Folder } from '../../folder/folder.entity';
import { Pv } from '../../pv/pv.entity';

@Resolver(() => Convocation)
export class AddConvocation {
  constructor(private convocationServices: ConvocationServices) {}

  @Mutation(() => Convocation)
  @UseGuards(GqlAuthGuard)
  async addConvocation(
    @CurrentUser() user: UserOutput,
    @Args('input')
    input: ConvocationAddInput,
  ): Promise<Convocation> {
    const folder = new Folder();

    return;
  }
}
