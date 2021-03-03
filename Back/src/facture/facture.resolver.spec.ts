import { Test, TestingModule } from '@nestjs/testing';
import { FacturesResolver } from './facture.resolver';

describe('FacturesResolver', () => {
  let resolver: FacturesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacturesResolver],
    }).compile();

    resolver = module.get<FacturesResolver>(FacturesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
