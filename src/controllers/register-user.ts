import { UseCase } from '@/usecases/ports';
import { Controller, HttpRequest, HttpResponse } from '@/controllers/ports';
import { MissingParamError } from '@/controllers/errors';
import { UserData } from '@/domain/entities';
import { created, badRequest, internalServerError } from '@/controllers/helpers';

export class RegisterUserController implements Controller {
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
      const response = await this.registerUserOnMailingList.perform(userData);

      if (response.isLeft()) {
        return badRequest(response.value);
      }

      return created(response.value);
    } catch (error) {
      return internalServerError(error);
    }
  }
}
