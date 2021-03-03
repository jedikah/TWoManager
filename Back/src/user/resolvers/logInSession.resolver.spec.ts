import { Test, TestingModule } from '@nestjs/testing';
import { UsersLogInSession } from './logInSession';

describe('UsersLogin', () => {
  let resolver: UsersLogInSession;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersLogInSession],
    }).compile();

    resolver = module.get<UsersLogInSession>(UsersLogInSession);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
