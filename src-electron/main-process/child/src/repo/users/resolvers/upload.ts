/* eslint-disable @typescript-eslint/no-var-requires */
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import { UserEntity } from '../../database/entities';
import { createWriteStream } from 'fs';
import { request } from 'http';
import * as FormData from 'form-data';

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
      // const data = await axios({
      //   method: 'post',
      //   url: 'http://localhost/Nouveau/index.php',
      //   data: createReadStream(),
      //   headers: {
      //     Accept: 'application/json, text/plain, */*',
      //     'Content-Type': 'multipart/form-data',
      //     'User-Agent': 'axios/0.19.2',
      //   },
      // });

      const form = new FormData();
      form.append('pdp', createReadStream(), 'filename.test');

      console.log({ header: form.getHeaders() });

      const req = request(
        {
          host: 'localhost',
          port: '80',
          path: '/Nouveau/index.php',
          method: 'POST',
          headers: form.getHeaders(),
        },
        response => {
          console.log(response.statusCode); // 200
          response.on('data', data => {
            console.log(data.toString());
            resolve(true);
          });
        },
      );

      form.pipe(req);
    });
  }
}
