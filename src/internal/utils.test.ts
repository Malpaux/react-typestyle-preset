import { isObject } from './utils';

describe('utilities', () => {
  it('should determine whether a value is an object', () => {
    expect(isObject(true)).toBe(false);
    expect(isObject(0)).toBe(false);
    expect(isObject('string')).toBe(false);
    expect(isObject(NaN)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject([])).toBe(false);
    expect(isObject([0, 1, 2])).toBe(false);

    expect(isObject({})).toBe(true);
    expect(isObject({ key: 'value' })).toBe(true);

    class ClassName {}
    expect(isObject(new ClassName())).toBe(true);
  });
});
