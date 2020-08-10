import { Resolver } from '@nestjs/graphql';
import { CollaborationsService } from '../collaborations.service';

@Resolver('Resolver')
export class ResolverResolver {
  constructor(private collaborationsService: CollaborationsService) {}
}
