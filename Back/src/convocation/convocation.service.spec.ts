import { Test, TestingModule } from '@nestjs/testing';
import { ConvocationServices } from './convocation.service';

describe('ConvocationServices', () => {
  let service: ConvocationServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConvocationServices],
    }).compile();

    service = module.get<ConvocationServices>(ConvocationServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
