import env from '../../../src/Utils/env';

describe('env helper', () => {
  describe('Getting some variable', () => {
    test('It returns undefined when variable is not defined and there are not default value', () => {
      const result = env('TESTING_VARIABLE');
      expect(result).toBeUndefined();
    });
    test('It returns the default value when variable is not defined and there are default value', () => {
      const defaultValue = 'DEFAULT_VALUE';
      const result = env('TESTING_VARIABLE', defaultValue);
      expect(result).toEqual(defaultValue);
    });
    test('It returns the parsed value when variable is defined', () => {
      const environments: Record<string, any> = {
        'true': true,
        '(true)': true,
        'false': false,
        '(false)': false,
        'empty': '',
        '(empty)': '',
        'null': null,
        '(null)': null,
        'DATA': 'DATA',
      }
      for (const value in environments) {
        process.env.VARIABLE = value;
        const result = env('VARIABLE');
        expect(result).toEqual(environments[value]);
      }
    });
  });
});
