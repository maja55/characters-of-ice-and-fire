import { getProp, ensureArray } from '../objectutils';

describe('ensureArray', () => {
  it('should return the given array object if its an array', () => {
      expect(ensureArray([])).toEqual([]);
      expect(ensureArray([1, 2, 3])).toEqual([1, 2, 3]);
      expect(ensureArray(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
      expect(ensureArray([{ a: 'b' }])).toEqual([{ a: 'b' }]);

      const theValueReference = [{ a: 'b' }];
      expect(ensureArray(theValueReference)).toBe(theValueReference);
  });

  it('should return given value wrapped in array if the given object is not an array', () => {
      expect(ensureArray({})).toEqual([{}]);
      expect(ensureArray('hello')).toEqual(['hello']);
      expect(ensureArray(123)).toEqual([123]);
  });

  it('should return empty array if truthy value is not provided', () => {
    expect(ensureArray(null)).toEqual([]);
    expect(ensureArray(undefined)).toEqual([]);
    expect(ensureArray(false)).toEqual([]);
    expect(ensureArray()).toEqual([]);
  });
});

describe('getProp', () => {
  it('should return the property from an object', () => {
      expect(getProp({ someProperty: 'someValue' }, 'someProperty')).toBe('someValue');
      expect(getProp({ someProperty: null }, 'someProperty')).toBeNull();
      expect(getProp({ someProperty: undefined }, 'someProperty')).toBeUndefined();
  });

  it('should return a property from a nested object', () => {
      const prop = getProp({ someObject: { someField: 'someNestedValue' } }, 'someObject.someField');
      expect(prop).toBe('someNestedValue');
  });

  it('should return undefined when the property does not exist in the given object', () => {
      const prop = getProp({ someField: 'someNestedValue' }, 'someOtherField');
      expect(prop).toBeUndefined();
  });

  it('should return undefined when the nested property does not exist in the given object', () => {
      const prop = getProp({ someField: 'someNestedValue' }, 'someOtherObject.someOtherField');
      expect(prop).toBeUndefined();
  });

  it('should return undefined when the property does not exist in a nested object', () => {
      const prop = getProp({ someObject: { someField: 'someNestedValue' } }, 'someObject.someOtherField');
      expect(prop).toBeUndefined();
  });

  it('should return undefined when the given object does not exist', () => {
      expect(getProp(null, 'someObject.someOtherField')).toBeUndefined();
      expect(getProp(undefined, 'someObject.someOtherField')).toBeUndefined();
      expect(getProp({}, 'someObject.someOtherField')).toBeUndefined();
  });
});
