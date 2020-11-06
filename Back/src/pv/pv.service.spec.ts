import { Test, TestingModule } from '@nestjs/testing';
import { PvServices } from './pv.service';

describe('PvServices', () => {
  let service: PvServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PvServices],
    }).compile();

    service = module.get<PvServices>(PvServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
