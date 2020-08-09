import { Test, TestingModule } from '@nestjs/testing';
import { LettersResolver } from './letters.resolver';

describe('LettersResolver', () => {
  let resolver: LettersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LettersResolver],
    }).compile();

    resolver = module.get<LettersResolver>(LettersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
