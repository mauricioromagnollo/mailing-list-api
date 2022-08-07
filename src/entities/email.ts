export class Email {
  public static readonly MAX_EMAIL_SIZE = 320;
  public static readonly MAX_EMAIL_LOCALPART_SIZE = 64;
  public static readonly MAX_EMAIL_DOMAIN_SIZE = 255;

  static validate(email: string): boolean {
    if (!email) {
      return false;
    }

    if (email.length > this.MAX_EMAIL_SIZE) {
      return false;
    }

    const [localpart, domain] = email.split('@');

    if (localpart.length > this.MAX_EMAIL_LOCALPART_SIZE || localpart.length === 0) {
      return false;
    }

    if (domain.length > this.MAX_EMAIL_DOMAIN_SIZE || domain.length === 0) {
      return false;
    }

    return true;
  }
}
