import { Test, TestingModule } from '@nestjs/testing';
import { FolderServices } from './folder.service';

describe('FolderServices', () => {
  let service: FolderServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FolderServices],
    }).compile();

    service = module.get<FolderServices>(FolderServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
