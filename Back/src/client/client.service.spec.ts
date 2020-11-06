import { Test, TestingModule } from '@nestjs/testing';
import { ClientServices } from './client.service';

describe('ClientServices', () => {
  let service: ClientServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientServices],
    }).compile();

    service = module.get<ClientServices>(ClientServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
