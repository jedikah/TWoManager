import { Test, TestingModule } from '@nestjs/testing';
import { UsersCount } from './usersCount';

describe('UsersRegiUsersster', () => {
  let resolver: UsersCount;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCount],
    }).compile();

    resolver = module.get<UsersCount>(UsersCount);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
