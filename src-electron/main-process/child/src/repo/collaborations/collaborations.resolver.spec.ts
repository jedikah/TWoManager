import { Test, TestingModule } from '@nestjs/testing';
import { CollaborationsResolver } from './collaborations.resolver';

describe('CollaborationsResolver', () => {
  let resolver: CollaborationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollaborationsResolver],
    }).compile();

    resolver = module.get<CollaborationsResolver>(CollaborationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
