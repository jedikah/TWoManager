import { Pv } from './../pv/pv.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cause } from "./cause.entity";

@Injectable()
export class CauseServices {
    constructor(
        @InjectRepository(Cause)
        private causeRepository: Repository<Cause>,
    ){}

    async addCause(cause: Cause): Promise<Cause> {
        return this.causeRepository.save(cause)
    }

    async updateCause(cause: Cause): Promise<Cause> {
        return this.causeRepository.save(cause)
    }

    async getCauseById(causeId: number): Promise<Cause> {
        return this.causeRepository.findOne({causeId})
    }

    async getCauseByPv( pv: Pv): Promise<Cause[]> {
        return this.causeRepository.find({pv})
    }
}