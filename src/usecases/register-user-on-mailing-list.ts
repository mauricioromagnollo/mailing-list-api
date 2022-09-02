import { Either, left, right } from '@/shared';
import { User, UserData } from '@/domain/entities';
import { InvalidNameError, InvalidEmailError } from '@/domain/errors';
import { UseCase, UserRepository } from '@/usecases/ports';

export class RegisterUserOnMailingList implements UseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async perform(request: UserData):
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
