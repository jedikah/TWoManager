import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { User } from '../user.entity';
import { UserService } from '../user.service';
import { UserOutput, RegisterInput } from '../user.types';
import { HttpException, HttpStatus } from '@nestjs/common';

const bcrypt = require('bcrypt');
const saltRounds = 11;

@Resolver(of => User)
export class UsersRegister {
  constructor(private userService: UserService) {}

  @Mutation(() => UserOutput)
  async register(@Args('input') input: RegisterInput): Promise<UserOutput> {
    if (await this.userService.getUserByLogin(input.login))
      throw new HttpException(
        "Ce login est déja attribué à un compte. Choisir un autre login s'il vous plaie.",
        HttpStatus.NOT_ACCEPTABLE,
      );
    const newUser = new User();

    const passToHash = (await new Promise(function(resolve, reject) {
      bcrypt.hash(input.password, saltRounds, function(err, hash) {
        if (!hash) reject(err);
        else resolve(hash);
      });
    })) as string;

    newUser.userName = input.userName;
    newUser.login = input.login.toLocaleLowerCase();
    newUser.password = passToHash;

    if (input.photo) newUser.photo = input.photo;

    if ((await this.userService.getUsersCount()) === 0) {
      newUser.type = 'Administrateur';
      newUser.status = true;
    }

    return await this.userService.setRegister(newUser);
  }
}
