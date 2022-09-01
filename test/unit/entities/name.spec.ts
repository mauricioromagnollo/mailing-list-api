import { describe, test, expect } from '@/test/ports';
import { Name } from '@/entities';

describe('Name validate', () => {
  test('should not accept null name', () => {
    const name = null;
    const isValidName: boolean = Name.validate(name);
    expect(isValidName).toBeFalsy();
  });
});
