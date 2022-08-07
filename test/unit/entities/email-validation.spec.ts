import { describe, test, expect } from '@/test/ports';
import { Email } from '@/entities';

describe('Email validation', () => {
  test('should not accept null strings', () => {
    const email = null;
    const isValidEmail: boolean = Email.validate(email);
    expect(isValidEmail).toBeFalsy();
  });

  test('should not accept empty strings', () => {
    const email = '';
    const isValidEmail: boolean = Email.validate(email);
    expect(isValidEmail).toBeFalsy();
  });

  test('should accept valid email', () => {
    const email = 'any@mail.com';
    const isValidEmail: boolean = Email.validate(email);
    expect(isValidEmail).toBeTruthy();
  });

  test('should not accept localpart larger than 64 chars', () => {
    const email = `${'l'.repeat(65)}@mail.com`;
    const isValidEmail: boolean = Email.validate(email);
    expect(isValidEmail).toBeFalsy();
  });
});
