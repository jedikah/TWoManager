import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserOutput } from './users.types';

const bcrypt = require('bcrypt');
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  // Get

  async getUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async getUserByLogin(login: string): Promise<UserEntity> {
    const user = await this.usersRepository.find({
      select: [
        'userId',
        'userName',
        'login',
        'photo',
        'password',
        'type',
        'status',
      ],
      where: { login: login },
    });

    return user[0];
  }

  async getUsersCount(): Promise<number> {
    return await this.usersRepository.count();
  }

  // Add

  async setRegister(newUser: UserEntity): Promise<UserOutput> {
    const user = await this.usersRepository.save(newUser);
    const { password, folders, ...userOutput } = user;
    return userOutput as UserOutput;
  }

  // Utiles

  async pwdCompare(inputPwd: string, pwd: string): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      bcrypt.compare(inputPwd, pwd, (err, result) => {
        if (!result) resolve(result);
        else resolve(result);
      });
    });
  }
}
