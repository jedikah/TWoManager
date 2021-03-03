import { Test, TestingModule } from '@nestjs/testing';
import { AddClients } from './addClients';

describe('AddClientsResolver', () => {
  let resolver: AddClients;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddClients],
    }).compile();

    resolver = module.get<AddClients>(AddClients);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
