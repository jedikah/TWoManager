import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TypeTrav } from "./typetrav.entity";

@Injectable()
export class TypeTravServices {
    constructor(
        @InjectRepository(TypeTrav)
        private typetravRepository: Repository<TypeTrav>,
    ){}

    async typetravs():Promise<TypeTrav[]> {
        return this.typetravRepository.find()
    }

    async typetravById(typeTravId: number):Promise<TypeTrav> {
        return this.typetravRepository.findOne({typeTravId})
    }

    async addTypeTrav(typeTrav: TypeTrav): Promise<TypeTrav> {
        return this.typetravRepository.save(typeTrav)
    }

    async updateTypeTrav(typeTrav: TypeTrav): Promise<TypeTrav> {
        return this.typetravRepository.save(typeTrav)
    }
}