import { Test, TestingModule } from '@nestjs/testing';
import { ConvocationsResolver } from './convocations.resolver';

describe('ConvocationsResolver', () => {
  let resolver: ConvocationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConvocationsResolver],
    }).compile();

    resolver = module.get<ConvocationsResolver>(ConvocationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
