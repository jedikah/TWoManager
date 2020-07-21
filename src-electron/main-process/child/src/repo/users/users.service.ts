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

  async register(input: LoginInput): Promise<UserEntity> {
    const user = await this.userRepository.find({
      select: ['userId', 'userName', 'login'],
      where: { login: input.login, password: input.password },
    });
    return user[0] || null;
  }

  // Add

  async addUser(newUser: UserEntity): Promise<UserEntity> {
    const result = await this.userRepository.save(newUser);
    return result;
  }
}
