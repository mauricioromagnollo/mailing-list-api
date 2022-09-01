import { HttpRequest, HttpResponse } from '@/controllers/ports';
import { UserData } from '@/entities';
import { RegisterUserOnMailingList } from '@/usecases';
import { created } from '@/controllers/helpers';

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList;

  constructor(usecase: RegisterUserOnMailingList) {
    this.usecase = usecase;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = request.body;
    const response = await this.usecase.registerUserOnMailingList(userData);
    let httpResponse: HttpResponse;

    if (response.isRight()) {
      return created(response.value);
    }

    return httpResponse;
  }
}
