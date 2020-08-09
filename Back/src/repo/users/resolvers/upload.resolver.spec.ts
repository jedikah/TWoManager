import { Test, TestingModule } from '@nestjs/testing';
import { UsersUpload } from './upload';

describe('UsersRegister', () => {
  let resolver: UsersUpload;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersUpload],
    }).compile();

    resolver = module.get<UsersUpload>(UsersUpload);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
