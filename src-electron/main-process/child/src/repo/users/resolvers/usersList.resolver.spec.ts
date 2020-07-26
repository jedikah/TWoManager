import { Test, TestingModule } from '@nestjs/testing';
import { UsersList } from './usersList';

describe('UsersRegiUsersster', () => {
  let resolver: UsersList;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersList],
    }).compile();

    resolver = module.get<UsersList>(UsersList);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
