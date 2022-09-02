import { UseCase } from '@/usecases/ports';
import { MissingParamError } from '@/controllers/errors';
import { HttpRequest, HttpResponse } from '@/controllers/ports';
import { UserData } from '@/domain/entities';
import { created, badRequest, internalServerError } from '@/controllers/helpers';

export class RegisterUserController {
  private readonly registerUserOnMailingList: UseCase;

  constructor(usecase: UseCase) {
    this.registerUserOnMailingList = usecase;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email } = request.body;

      if (!name && !email) {
        return badRequest(new MissingParamError('name email'));
      }

      if (!name || !email) {
        const missingParam = !name ? 'name' : 'email';
        return badRequest(new MissingParamError(missingParam));
      }

      const userData: UserData = request.body;
      const registerUserOnMailingList = await this.registerUserOnMailingList.perform(userData);
      let httpResponse: HttpResponse;

      if (registerUserOnMailingList.isLeft()) {
        httpResponse = badRequest(registerUserOnMailingList.value);
      }

      if (registerUserOnMailingList.isRight()) {
        httpResponse = created(registerUserOnMailingList.value);
      }

      return httpResponse;
    } catch (error) {
      return internalServerError(error);
    }
  }
}
