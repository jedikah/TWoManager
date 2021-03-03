import { Test, TestingModule } from '@nestjs/testing';
import { CollaborationServices } from './collaborate.service';

describe('CollaborationServices', () => {
  let service: CollaborationServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollaborationServices],
    }).compile();

    service = module.get<CollaborationServices>(CollaborationServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
