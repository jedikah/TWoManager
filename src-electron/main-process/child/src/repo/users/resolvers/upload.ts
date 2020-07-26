/* eslint-disable @typescript-eslint/no-var-requires */
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import { UserEntity } from '../../database/entities';
import { createWriteStream } from 'fs';

@Resolver(of => UserEntity)
export class UsersUpload {
  constructor() {}

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ): Promise<boolean> {
    const path = require('path');
    const f = path.join(__dirname, filename);
    console.log(f);

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(f))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
  }
}
