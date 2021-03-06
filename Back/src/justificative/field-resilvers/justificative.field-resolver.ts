import { PvServices } from './../../pv/pv.service';
import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Justificative } from './../justificative.entity';
import { Pv } from '../../pv/pv.entity';

@Resolver(() => Justificative)
export class JustificativeFielResolver {
    constructor(
        private pvServices: PvServices
    ) {}

    @ResolveField(() => Pv)
    pv(@Root() justificative: Justificative): Promise<Pv> {
        return this.pvServices.pvById(justificative.pvId)
    }
}