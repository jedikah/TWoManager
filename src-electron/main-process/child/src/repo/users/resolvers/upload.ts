/* eslint-disable @typescript-eslint/no-var-requires */
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import { UserEntity } from '../../database/entities';
import { createWriteStream } from 'fs';
import { request } from 'http';
import * as FormData from 'form-data';
import axios from 'axios';

@Resolver(of => UserEntity)
export class UsersUpload {
  constructor() {}

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ): Promise<boolean> {
    const path = require('path');
    console.log({ filename });
    const f = path.join('http://localhost', filename);
    console.log(f);

    return new Promise(async (resolve, reject) => {
      const bodyFormData = new FormData();
      bodyFormData.append('pdp', createReadStream(), filename);

      axios({
        method: 'post',
        url: 'http://localhost/Nouveau/index.php',
        data: bodyFormData,
        headers: bodyFormData.getHeaders(),
      })
        .then(function(response) {
          //handle success
          console.log(response.data);
          resolve(true);
        })
        .catch(function(response) {
          //handle error
          console.log(response);
          reject(false);
        });
    });
  }
}
