import { Either, left, right } from '@/shared';
import { InvalidEmailError, InvalidNameError, Name } from '@/entities';
import { UserData } from './user-data';
import { Email } from './email';

export class User {
  public readonly name: Name;
  public readonly email: Email;

  constructor(name: Name, email: Email) {
    this.name = name;
    this.email = email;
  }

  static create(userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name);

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError(userData.name));
    }

    const emailOrError = Email.create(userData.email);

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError(userData.email));
    }

    const name: Name = nameOrError.value as Name;
    const email: Email = emailOrError.value as Email;

    return right(new User(name, email));
  }
}
