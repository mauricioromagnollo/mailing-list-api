import { Either, left, right } from '@/shared';
import { InvalidEmailError } from '@/entities/errors';

export class Email {
  public static readonly MAX_EMAIL_SIZE = 320;
  public static readonly MAX_EMAIL_LOCALPART_SIZE = 64;
  public static readonly MAX_EMAIL_DOMAIN_SIZE = 255;
  public static readonly MAX_EMAIL_DOMAIN_PART_SIZE = 63;

  private readonly email: string;

  private constructor(email: string) {
    this.email = email;
  }

  static create(email: string): Either<InvalidEmailError, Email> {
    if (this.validate(email)) {
      return right(new Email(email));
    }

    return left(new InvalidEmailError(email));
  }

  static validate(email: string): boolean {
    if (!email) {
      return false;
    }

    if (email.length > this.MAX_EMAIL_SIZE) {
      return false;
    }

    const EMAIL_REGEX = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!EMAIL_REGEX.test(email)) {
      return false;
    }

    const [localpart, domain] = email.split('@');

    if (localpart.length > this.MAX_EMAIL_LOCALPART_SIZE || localpart.length === 0) {
      return false;
    }

    if (domain.length > this.MAX_EMAIL_DOMAIN_SIZE || domain.length === 0) {
      return false;
    }

    const domainParts = domain.split('.');
    const isLargerDomainPart = domainParts.some(
      (part) => part.length > this.MAX_EMAIL_DOMAIN_PART_SIZE,
    );

    if (isLargerDomainPart) {
      return false;
    }

    return true;
  }

  get value(): string {
    return this.email;
  }
}
