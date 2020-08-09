import { Test, TestingModule } from '@nestjs/testing';
import { PvsResolver } from './pvs.resolver';

describe('PvsResolver', () => {
  let resolver: PvsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PvsResolver],
    }).compile();

    resolver = module.get<PvsResolver>(PvsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
