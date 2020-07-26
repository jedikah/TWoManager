import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { UserEntity } from '../../database/entities';
import { UsersService } from '../users.service';
import { UserOutput, UserInput } from '../../types';

const bcrypt = require('bcrypt');
const saltRounds = 11;

@Resolver(of => UserEntity)
export class UsersRegister {
  constructor(private usersService: UsersService) {}

  @Mutation(() => UserOutput)
  async register(@Args('input') input: UserInput) {
    const newUser = new UserEntity();

    const passToHash = (await new Promise(function(resolve, reject) {
      bcrypt.hash(input.password, saltRounds, function(err, hash) {
        if (!hash) reject(err);
        else resolve(hash);
      });
    })) as string;

    newUser.userName = input.userName;
    newUser.login = input.login.toLocaleLowerCase();
    newUser.password = passToHash;
    if ((await this.usersService.getUsersCount()) === 0) {
      newUser.type = 'administrator';
      newUser.status = true;
    }

    return await this.usersService.setRegister(newUser);
  }
}
