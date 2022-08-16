import { describe, test, expect } from '@/test/ports';
import { UserRepository, RegisterUserOnMailingList } from '@/usecases';
import { UserData } from '@/entities';
import { left } from '@/shared';
import { InvalidEmailError, InvalidNameError } from '@/entities/errors';

import { InMemoryUserRepository } from '@/test/doubles/fakes';

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = [];
    const userRepository: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(userRepository);
    const name = 'any_name';
    const email = 'any@email.com';
    const response = await usecase.registerUserOnMailingList({ name, email });
    const user = await userRepository.findUserByEmail(email);
    expect(user.name).toBe(name);
    expect(response.value.name).toBe(name);
  });

  test('should not add user with invalid email to mailing list ', async () => {
    const users: UserData[] = [];
    const userRepository: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(userRepository);
    const name = 'any_name';
    const invalidEmail = 'invalid_email';
    const response = await usecase.registerUserOnMailingList({ name, email: invalidEmail });
    const user = await userRepository.findUserByEmail(invalidEmail);
    expect(user).toBeNull();
    expect(response).toEqual(left(new InvalidEmailError()));
  });

  test('should not add user with invalid name to mailing list ', async () => {
    const users: UserData[] = [];
    const userRepository: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(userRepository);
    const invalidName = '';
    const email = 'any@email.com';
    const response = await usecase.registerUserOnMailingList({ name: invalidName, email });
    const user = await userRepository.findUserByEmail(email);
    expect(user).toBeNull();
    expect(response).toEqual(left(new InvalidNameError()));
  });
});
