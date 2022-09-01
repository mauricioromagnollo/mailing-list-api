import { describe, test, expect } from '@/test/ports';
import { Email } from '@/entities';

describe('Email validate', () => {
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

  test(`should not accept strings larger than ${Email.MAX_EMAIL_SIZE} chars`, () => {
    const email = `${'l'.repeat(64)}@${'d'.repeat(128)}.${'d'.repeat(127)}`;
    const isValidEmail: boolean = Email.validate(email);
    expect(isValidEmail).toBeFalsy();
  });

  test(`should not accept domain part larger than ${Email.MAX_EMAIL_DOMAIN_SIZE} chars`, () => {
    const email = `local@${'d'.repeat(128)}.${'d'.repeat(127)}`;
    const isValidEmail: boolean = Email.validate(email);
    expect(isValidEmail).toBeFalsy();
  });

  test(`should not accept localpart larger than ${Email.MAX_EMAIL_LOCALPART_SIZE} chars`, () => {
    const localpart = 'l'.repeat(Email.MAX_EMAIL_LOCALPART_SIZE + 1);
    const email = `${localpart}@mail.com`;
    const isValidEmail: boolean = Email.validate(email);
    expect(isValidEmail).toBeFalsy();
  });

  test('should not accept empty localpart', () => {
    const email = '@mail.com';
    const isValidEmail: boolean = Email.validate(email);
    expect(isValidEmail).toBeFalsy();
  });

  test('should not accept empty domain', () => {
    const email = 'any@';
    const isValidEmail: boolean = Email.validate(email);
    expect(isValidEmail).toBeFalsy();
  });

  test(`should not accept domain with a part larger than ${Email.MAX_EMAIL_DOMAIN_PART_SIZE} chars`, () => {
    const email = `any@${'d'.repeat(64)}.com`;
    const isValidEmail: boolean = Email.validate(email);
    expect(isValidEmail).toBeFalsy();
  });

  test('should not accept localpart with invalid char', () => {
    const email = 'any email@mail.com';
    const isValidEmail: boolean = Email.validate(email);
    expect(isValidEmail).toBeFalsy();
  });

  test('should not accept localpart with two dots', () => {
    const email = 'any..email@mail.com';
    const isValidEmail: boolean = Email.validate(email);
    expect(isValidEmail).toBeFalsy();
  });

  test('should not accept localpart with ending dot', () => {
    const email = 'any.@mail.com';
    const isValidEmail: boolean = Email.validate(email);
    expect(isValidEmail).toBeFalsy();
  });

  test('should not accept email without an at-sign', () => {
    const email = 'anymail.com';
    const isValidEmail: boolean = Email.validate(email);
    expect(isValidEmail).toBeFalsy();
  });
});
