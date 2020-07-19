import { Resolver, Query } from '@nestjs/graphql';

import { LetterEntity } from '../database/entities';
import { LetterService } from '../services';

@Resolver(of => LetterEntity)
class LetterResolver {
  constructor(private letterService: LetterService) {}

  @Query(() => String)
  HelloWorld() {
    return 'hello';
  }

  @Query(() => String)
  findAll() {
    return this.letterService.findAll();
  }
}

export default LetterResolver;
