import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserOutput } from './user.types';

const bcrypt = require('bcrypt');
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Get

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserById(userId: number): Promise<User> {
    return this.usersRepository.findOne({userId});
  }

  async getUserByLogin(login: string): Promise<User> {
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
    return this.usersRepository.count();
  }

  // Add

  async setRegister(newUser: User): Promise<UserOutput> {
    const user = await this.usersRepository.save(newUser);
    const { password, folders, ...userOutput } = user;
    return userOutput as UserOutput;
  }

  // Utiles

  async pwdCompare(inputPwd: string, pwd: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(inputPwd, pwd, (err, result) => {
        if (!result) resolve(result);
        else resolve(result);
      });
    });
  }
}
