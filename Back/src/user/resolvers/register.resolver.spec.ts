import { Test, TestingModule } from '@nestjs/testing';
import { UsersRegister } from './register';

describe('UsersRegister', () => {
  let resolver: UsersRegister;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRegister],
    }).compile();

    resolver = module.get<UsersRegister>(UsersRegister);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
