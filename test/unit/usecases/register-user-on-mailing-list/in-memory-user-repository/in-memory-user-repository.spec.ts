import { UserRepository } from '../../../../../src/usecases/ports/user-repository';
import { describe, test, expect } from '@/test/ports';

import { InMemoryUserRepository } from './in-memory-user-repository';
import { UserData } from '@/usecases';

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = [];
    const userRepository = new InMemoryUserRepository(users);
    const user = await userRepository.findUserByEmail('any@mail.com');
    expect(user).toBeNull();
  });

  test('should return user if it is found in the repository', async () => {
    const users: UserData[] = [];
    const name = 'any_name';
    const email = 'any@mail.com';
    const userRepository: UserRepository = new InMemoryUserRepository(users);
    await userRepository.add({ name, email });
    const user = await userRepository.findUserByEmail(email);
    expect(user.name).toBe(name);
  });

  test('should return all users in repository', async () => {
    const users: UserData[] = [{ name: 'any_name', email: 'any@email.com' }, { name: 'second_name', email: 'second@mail.com' }];
    const userRepository: UserRepository = new InMemoryUserRepository(users);
    const returnedUsers = await userRepository.findAllUsers();
    expect(returnedUsers.length).toBe(2);
  });
});
