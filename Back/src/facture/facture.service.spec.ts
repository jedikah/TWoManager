import { Test, TestingModule } from '@nestjs/testing';
import { FactureServices } from './facture.service';

describe('FactureServices', () => {
  let service: FactureServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactureServices],
    }).compile();

    service = module.get<FactureServices>(FactureServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
