import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from '../database/entities';

@Injectable()
class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  // async findAll(): Promise<ClientEntity[]> {
  //   return this.clientRepository.find();
  // }
}

export default ClientService;
