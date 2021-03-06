import { Convocation } from './../convocation.entity';
import { PvServices } from './../../pv/pv.service';
import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Pv } from '../../pv/pv.entity';

@Resolver(() => Convocation)
export class ConvocationFielResolver {
    constructor(
        private pvServices: PvServices
    ) {}

    @ResolveField(() => Pv)
    pv(@Root() convocation: Convocation): Promise<Pv> {
        return this.pvServices.pvById(convocation.pvId)
    }
}