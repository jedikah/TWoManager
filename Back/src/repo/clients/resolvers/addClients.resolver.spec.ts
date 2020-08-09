import { Test, TestingModule } from '@nestjs/testing';
import { AddClientsResolver } from './addClients';

describe('AddClientsResolver', () => {
  let resolver: AddClientsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddClientsResolver],
    }).compile();

    resolver = module.get<AddClientsResolver>(AddClientsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
