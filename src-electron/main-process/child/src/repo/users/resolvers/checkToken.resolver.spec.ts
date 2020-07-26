import { Test, TestingModule } from '@nestjs/testing';
import { UsersCheckToken } from './checkToken';

describe('UsersCheckToken', () => {
  let resolver: UsersCheckToken;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCheckToken],
    }).compile();

    resolver = module.get<UsersCheckToken>(UsersCheckToken);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
