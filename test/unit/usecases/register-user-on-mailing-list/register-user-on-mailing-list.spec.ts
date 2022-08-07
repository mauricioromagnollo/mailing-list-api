import { describe, test, expect } from '@/test/ports';
import { UserRepository } from '@/usecases';
import { UserData } from '@/entities';

import { InMemoryUserRepository } from './in-memory-user-repository';

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = [];
    const userRepository: UserRepository = new InMemoryUserRepository(users);
    expect(userRepository).not.toBeNull();
  });
});
