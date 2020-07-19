import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConvocationEntity } from '../database/entities';

@Injectable()
class ConvocationService {
  constructor(
    @InjectRepository(ConvocationEntity)
    private convocationRepository: Repository<ConvocationEntity>,
  ) {}

  // async findAll(): Promise<ConvocationEntity[]> {
  //   return this.convocationRepository.find();
  // }
}

export default ConvocationService;
