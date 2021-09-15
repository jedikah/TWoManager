import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Model } from './model.entity';

@Injectable()
export class ModelServices {
  constructor(
    @InjectRepository(Model)
    private modelService: Repository<Model>,
  ) {}

  async addModel(model: Model): Promise<Model> {
    return this.modelService.save(model);
  }

  async updateModel(model: Model): Promise<Model> {
    return this.modelService.save(model);
  }

  async getModelById(id: number): Promise<Model> {
    return this.modelService.findOne({ id });
  }

  async getModels(label: string, name: string): Promise<Model[]> {
    return this.modelService
      .createQueryBuilder()
      .where('label like :label', { label: `%${label}%` })
      .andWhere('name like :name', { name: `%${name}%` })
      .getMany();
  }
}
