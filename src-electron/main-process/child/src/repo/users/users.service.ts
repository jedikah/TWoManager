import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities';
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
    const user = await this.userRepository.find({ where: { login: login } });
    return user[0];
  }

  // Add

  async addUser(newUser: UserEntity): Promise<UserEntity> {
    const result = await this.userRepository.save(newUser);
    return result;
  }
}
