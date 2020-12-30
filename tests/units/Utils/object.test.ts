import getObjectKey from '../../../src/Utils/object';

describe('object helper', () => {
  describe('Getting some key', () => {
    const invalidParameters: any[] = [
      'string',
      11,
      11.10,
      null,
      false
    ];
    const object: any = {
      aa: {
        bb: {
          cc: 'value'
        }
      }
    };
    test('It returns undefined when parameter is not an object and there are not default value', () => {
      for (const parameter of invalidParameters) {
        const result = getObjectKey(parameter,'key');
        expect(result).toBeUndefined();
      }
    });
    test('It returns the default value when parameter is not an object and there are default value', () => {
      const defaultValue = 'DEFAULT_VALUE';
      for (const parameter of invalidParameters) {
        const result = getObjectKey(parameter,'key', defaultValue);
        expect(result).toEqual(defaultValue);
      }
    });
    test('It returns undefined when key is not defined and there are not default value', () => {
      const keys: any[] = [
        'dd',
        'aa.dd',
        'aa.bb.dd',
        'aa.bb.cc.dd',
      ];
      for (const key of keys) {
        const result = getObjectKey(object, key);
        expect(result).toBeUndefined();
      }
    });
    test('It returns the default value when key is not defined and there are default value', () => {
      const keys: any[] = [
        'dd',
        'aa.dd',
        'aa.bb.dd',
        'aa.bb.cc.dd',
      ];
      const defaultValue = 'DEFAULT_VALUE';
      for (const key of keys) {
        const result = getObjectKey(object, key, defaultValue);
        expect(result).toEqual(defaultValue);
      }
    });
    test('It returns the correct value when key is defined and there are default value', () => {
      const keys: Record<string, any> = {
        'aa': object.aa,
        'aa.bb': object.aa.bb,
        'aa.bb.cc': object.aa.bb.cc,
      };
      const defaultValue = 'DEFAULT_VALUE';
      for (const key in keys) {
        const result = getObjectKey(object, key, defaultValue);
        expect(result).toEqual(keys[key]);
      }
    });
  });
});
