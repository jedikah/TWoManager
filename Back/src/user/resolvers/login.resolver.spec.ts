import { Test, TestingModule } from '@nestjs/testing';
import { UsersLogin } from './logIn';

describe('UsersLogin', () => {
  let resolver: UsersLogin;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersLogin],
    }).compile();

    resolver = module.get<UsersLogin>(UsersLogin);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
