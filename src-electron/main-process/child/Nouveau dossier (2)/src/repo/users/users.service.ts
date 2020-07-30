import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities';
import { LoginInput, UserInput, UserOutput } from '../types';
import { TableName } from '../database/TableName';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // Get

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUserByLogin(login: string): Promise<UserEntity> {
    const user = await this.userRepository.find({
      select: ['userId', 'userName', 'login', 'password', 'type', 'status'],
      where: { login: login },
    });

    return user[0];
  }

  async getUsersCount(): Promise<number> {
    return await this.userRepository.count();
  }

  // Add

  async setRegister(newUser: UserEntity): Promise<UserOutput> {
    const user = await this.userRepository.save(newUser);
    const { password, folders, ...userOutput } = user;
    return userOutput as UserOutput;
  }
}
