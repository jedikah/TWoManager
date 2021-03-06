import { PvServices } from './../../pv/pv.service';
import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Pv } from '../../pv/pv.entity';
import { Cause } from '../cause.entity';

@Resolver(() => Cause)
export class CauseFielResolver {
    constructor(
        private pvServices: PvServices
    ) {}

    @ResolveField(() => Pv)
    pv(@Root() cause: Cause): Promise<Pv> {
        return this.pvServices.pvById(cause.pvId)
    }
}