import { describe, test, expect } from '@/test/ports';
import { InMemoryUserRepository } from '@/test/doubles/fakes';
import { HttpRequest, HttpResponse } from '@/controllers/ports';
import { RegisterUserOnMailingList } from '@/usecases';
import { UserRepository } from '@/usecases/ports';
import { UserData } from '@/entities';
import { RegisterUserController } from '@/controllers';
import { HTTP_STATUS_CODE } from '@/controllers/helpers';

type SutType = RegisterUserController;

const makeRegisterUserOnMailingList = (): RegisterUserOnMailingList => {
  const users: UserData[] = [];
  const userRepository: UserRepository = new InMemoryUserRepository(users);
  const registerUserOnMailingList = new RegisterUserOnMailingList(userRepository);
  return registerUserOnMailingList;
};

const makeSut = (): SutType => {
  const regiserUserOnMailingList = makeRegisterUserOnMailingList();
  return new RegisterUserController(regiserUserOnMailingList);
};

describe('Register User Controller', () => {
  test('should return status code 201 when request contains valid user data', async () => {
    const sut = makeSut();
    const request: HttpRequest = {
      body: {
        name: 'Any Name',
        email: 'any@mail.com',
      },
    };
    const response: HttpResponse = await sut.handle(request);
    expect(response.statusCode).toEqual(HTTP_STATUS_CODE.CREATED);
    expect(response.body).toEqual(request.body);
  });
});
