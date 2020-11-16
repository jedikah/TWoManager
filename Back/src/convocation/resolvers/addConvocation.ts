import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../../auths/jwt-auth.guard';
import { Convocation } from '../convocation.entity';
import { ConvocationServices } from '../convocation.service';
import { ConvocationAddInput } from '../convocation.types';
import { FolderServices } from '../../folder/folder.service';

@Resolver(() => Convocation)
export class AddConvocation {
  constructor(
    private convocationServices: ConvocationServices,
    private folderService: FolderServices,
  ) {}

  @Mutation(() => Convocation)
  @UseGuards(GqlAuthGuard)
  async addConvocation(
    @Args('input')
    input: ConvocationAddInput,
  ): Promise<Convocation> {
    const folder = await this.folderService.FolderById(input.folderId);
    const newConvocation = new Convocation();
    newConvocation.folder = folder;
    Object.assign<Convocation, ConvocationAddInput>(newConvocation, input);
    return this.convocationServices.addConvocation(newConvocation);
  }
}
