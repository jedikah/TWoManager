/* eslint-disable @typescript-eslint/no-var-requires */
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import * as FormData from 'form-data';
import axios from 'axios';
// import { createWriteStream } from 'fs';

import { UserEntity } from '../user.entity';

@Resolver(of => UserEntity)
export class UsersUpload {
  constructor() {}

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
    @Args('login') login: string,
  ): Promise<boolean> {
    // const path = require('path');

    return new Promise(async (resolve, reject) => {
      const bodyFormData = new FormData();
      bodyFormData.append('pdp', createReadStream(), login + '_pdp.JPG');
      bodyFormData.append('login', login);

      console.log({ filename });

      const onUploadProgress = progressEvent => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        console.log(percentCompleted);
      };

      axios({
        method: 'post',
        url: 'http://localhost/TWoM/pdp.php',
        data: bodyFormData,
        headers: bodyFormData.getHeaders(),
        onUploadProgress,
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
