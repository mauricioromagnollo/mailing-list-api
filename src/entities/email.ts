export class Email {
  static validate(email: string): boolean {
    if (!email) {
      return false;
    }

    const [localpart] = email.split('@');

    if (localpart.length > 64) {
      return false;
    }

    return true;
  }
}
