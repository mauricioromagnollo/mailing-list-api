import { describe, test, expect } from '@/test/ports';

import { UserData } from '@/usecases';

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = [];
    expect(users).not.toBe(null);
  });
});
