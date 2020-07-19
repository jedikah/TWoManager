import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}

export default UserService;
