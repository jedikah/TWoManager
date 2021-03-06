import { Model } from './model.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ModelServices {
    constructor(
        @InjectRepository(Model)
        private modelService: Repository<Model>
    ) {}

    async addModel(model: Model): Promise<Model> {
        return this.modelService.save(model)
    }

    async updateModel(model: Model): Promise<Model> {
        return this.modelService.save(model)
    }

    async getModelById(modelId: number): Promise<Model> {
        return this.modelService.findOne({modelId})
    }

    async getModels(label: string): Promise<Model[]> {
        return this.modelService.createQueryBuilder()
        .where('label like :label', {label: `%${label}%`})
        .getMany()
    }
}