import { describe, test, expect } from '@/test/ports';
import { InMemoryUserRepository } from '@/test/doubles/fakes';
import { UserRepository, RegisterUserOnMailingList } from '@/usecases';
import { UserData } from '@/entities';

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
    const response = (await usecase.registerUserOnMailingList({
      name,
      email: invalidEmail,
    })).value as Error;
    const user = await userRepository.findUserByEmail(invalidEmail);
    expect(user).toBeNull();
    expect(response.name).toEqual('InvalidEmailError');
    expect(response.message).toEqual(`Invalid email: ${invalidEmail}.`);
  });

  test('should not add user with invalid name to mailing list ', async () => {
    const users: UserData[] = [];
    const userRepository: UserRepository = new InMemoryUserRepository(users);
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(userRepository);
    const invalidName = '';
    const email = 'any@email.com';
    const response = (await usecase.registerUserOnMailingList({
      name: invalidName,
      email,
    })).value as Error;
    const user = await userRepository.findUserByEmail(email);
    expect(user).toBeNull();
    expect(response.name).toEqual('InvalidNameError');
    expect(response.message).toEqual(`Invalid name: ${invalidName}.`);
  });
});
