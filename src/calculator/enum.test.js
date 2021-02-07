import {getEnum} from './enum';

describe('enum', () => {
  test('should be able to get enum value', () => {
    const value = 5;
    const range = [1, 2, 3, 4, 5];
    expect(getEnum(value, range)).toEqual(5)
  })

  test('should be able to get default enum value', () => {
    const value = '';
    const range = [1, 2, 3, 4, 5];
    expect(getEnum(value, range)).toEqual(1)
  })
})
