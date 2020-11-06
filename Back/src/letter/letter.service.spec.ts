import { Test, TestingModule } from '@nestjs/testing';
import { LetterServices } from './letter.service';

describe('LetterServices', () => {
  let service: LetterServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LetterServices],
    }).compile();

    service = module.get<LetterServices>(LetterServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
