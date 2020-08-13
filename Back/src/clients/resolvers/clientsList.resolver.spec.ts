import { Test, TestingModule } from '@nestjs/testing';
import { ClientsListResolver } from './clientsList';

describe('ClientsListResolver', () => {
  let resolver: ClientsListResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsListResolver],
    }).compile();

    resolver = module.get<ClientsListResolver>(ClientsListResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
