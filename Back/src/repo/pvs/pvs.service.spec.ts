import { Test, TestingModule } from '@nestjs/testing';
import { PvsService } from './pvs.service';

describe('PvsService', () => {
  let service: PvsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PvsService],
    }).compile();

    service = module.get<PvsService>(PvsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
