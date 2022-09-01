import { Either, left, right } from '@/shared';
import { User, UserData } from '@/entities';
import { InvalidNameError, InvalidEmailError } from '@/entities/errors';
import { UserRepository } from '@/usecases/ports';

export class RegisterUserOnMailingList {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async registerUserOnMailingList(request: UserData):
    Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(request);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    if (!await this.userRepository.exists(request)) {
      await this.userRepository.add(request);
    }

    return right(request);
  }
}
