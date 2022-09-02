import { describe, test, expect } from '@/test/ports';
import { Name } from '@/domain/entities';

describe('Name validate', () => {
  test('should not accept null name', () => {
    const nullName = null;
    const isValidName: boolean = Name.validate(nullName);
    expect(isValidName).toBeFalsy();
  });

  test('should not accept empty string name', () => {
    const emptyName = '';
    const isValidName: boolean = Name.validate(emptyName);
    expect(isValidName).toBeFalsy();
  });

  test('should accept valid name', () => {
    const validName = 'valid_name';
    const isValidName: boolean = Name.validate(validName);
    expect(isValidName).toBeTruthy();
  });

  test('should not accept name less than two chars', () => {
    const smallName = 'O';
    const isValidName: boolean = Name.validate(smallName);
    expect(isValidName).toBeFalsy();
  });

  test('should not accept name larger than 256 chars', () => {
    const largeName = 'O'.repeat(256 + 1);
    const isValidName: boolean = Name.validate(largeName);
    expect(isValidName).toBeFalsy();
  });

  test('should be create name with no empty spaces', () => {
    const emptySpaceName = ' any name ';
    const numberOfEmptySpaces = 2;
    const expectedLength = emptySpaceName.length - numberOfEmptySpaces;
    const name = Name.create(emptySpaceName).value as Name;
    expect(name.value).toHaveLength(expectedLength);
  });
});
