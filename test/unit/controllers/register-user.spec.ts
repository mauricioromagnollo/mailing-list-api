import { describe, test, expect } from '@/test/ports';
import { InMemoryUserRepository } from '@/test/doubles/fakes';
import { HttpRequest, HttpResponse } from '@/controllers/ports';
import { MissingParamError } from '@/controllers/errors';
import { RegisterUserOnMailingList } from '@/usecases';
import { UserRepository } from '@/usecases/ports';
import { UserData } from '@/entities';
import { RegisterUserController } from '@/controllers';
import { HTTP_STATUS_CODE } from '@/controllers/helpers';
import { InvalidEmailError, InvalidNameError } from '@/entities/errors';

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

  test('should return status code 400 when request contains invalid name', async () => {
    const sut = makeSut();
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'A',
        email: 'any@mail.com',
      },
    };
    const response: HttpResponse = await sut.handle(requestWithInvalidName);
    expect(response.statusCode).toEqual(HTTP_STATUS_CODE.BAD_REQUEST);
    expect(response.body).toBeInstanceOf(InvalidNameError);
  });

  test('should return status code 400 when request contains invalid email', async () => {
    const sut = makeSut();
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'Any Name',
        email: 'invalid_email.com',
      },
    };
    const response: HttpResponse = await sut.handle(requestWithInvalidEmail);
    expect(response.statusCode).toEqual(HTTP_STATUS_CODE.BAD_REQUEST);
    expect(response.body).toBeInstanceOf(InvalidEmailError);
  });

  test('should return status code 400 when request is missing param name on body', async () => {
    const sut = makeSut();
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        email: 'any@mail.com',
      },
    };
    const response: HttpResponse = await sut.handle(requestWithInvalidEmail);
    expect(response.statusCode).toEqual(HTTP_STATUS_CODE.BAD_REQUEST);
    expect(response.body).toBeInstanceOf(MissingParamError);
    expect((response.body as Error).message).toEqual('Missing param from request: name.');
  });

  test('should return status code 400 when request is missing param email on body', async () => {
    const sut = makeSut();
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'Any Name',
      },
    };
    const response: HttpResponse = await sut.handle(requestWithInvalidEmail);
    expect(response.statusCode).toEqual(HTTP_STATUS_CODE.BAD_REQUEST);
    expect(response.body).toBeInstanceOf(MissingParamError);
    expect((response.body as Error).message).toEqual('Missing param from request: email.');
  });

  test('should return status code 400 when request is missing name and email on body', async () => {
    const sut = makeSut();
    const requestWithInvalidEmail: HttpRequest = {
      body: { },
    };
    const response: HttpResponse = await sut.handle(requestWithInvalidEmail);
    expect(response.statusCode).toEqual(HTTP_STATUS_CODE.BAD_REQUEST);
    expect(response.body).toBeInstanceOf(MissingParamError);
    expect((response.body as Error).message).toEqual('Missing param from request: name email.');
  });
});
