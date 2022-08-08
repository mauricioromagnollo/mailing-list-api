import { describe, test } from '@/test/ports';

import { User, InvalidEmailError } from '@/entities';
import { left } from '@/shared';

describe('User (Domain Entity)', () => {
  test('should not create user with invalid e-mail adress', () => {
    const invalidEmail = 'invalid_email';
    const error = User.create({ name: 'any_name', email: invalidEmail });
    expect(error).toEqual(left(new InvalidEmailError()));
  });
});
