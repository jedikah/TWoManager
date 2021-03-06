import { Test, TestingModule } from '@nestjs/testing';
import { Clients } from './clients';

describe('ClientsListResolver', () => {
  let resolver: Clients;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Clients],
    }).compile();

    resolver = module.get<Clients>(Clients);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
