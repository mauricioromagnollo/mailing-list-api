import { MissingParamError } from '@/controllers/errors';
import { HttpRequest, HttpResponse } from '@/controllers/ports';
import { UserData } from '@/entities';
import { RegisterUserOnMailingList } from '@/usecases';
import { created, badRequest } from '@/controllers/helpers';

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList;

  constructor(usecase: RegisterUserOnMailingList) {
    this.usecase = usecase;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const { name, email } = request.body;

    if (!name && !email) {
      return badRequest(new MissingParamError('name email'));
    }

    if (!name || !email) {
      const missingParam = !name ? 'name' : 'email';
      return badRequest(new MissingParamError(missingParam));
    }

    const userData: UserData = request.body;
    const registerUserOnMailingList = await this.usecase.registerUserOnMailingList(userData);
    let httpResponse: HttpResponse;

    if (registerUserOnMailingList.isLeft()) {
      httpResponse = badRequest(registerUserOnMailingList.value);
    }

    if (registerUserOnMailingList.isRight()) {
      httpResponse = created(registerUserOnMailingList.value);
    }

    return httpResponse;
  }
}
