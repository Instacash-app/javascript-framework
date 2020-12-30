import {
  default as config,
  Config
} from '../../../src/Utils/config';

describe('config helper', () => {
  beforeAll(() => {
    Config.configurePath(`${__dirname}/config`);
  });
  const validConfigurationFile = 'configuration';
  const invalidConfigurationFile = 'testing';
  describe('Getting some configuration', () => {
    test('It returns correct value when configuration file does not exist', () => {
      const defaultValue = 'DEFAULT_VALUE';
      const defaultValueResult = config(`${invalidConfigurationFile}.key`, defaultValue);
      const undefinedResult = config(`${invalidConfigurationFile}.key`);
      const objectResult = config(invalidConfigurationFile);
      const objectResultWithDefaultValue = config(invalidConfigurationFile, defaultValue);
      expect(defaultValueResult).toEqual(defaultValue);
      expect(undefinedResult).toBeUndefined();
      expect(objectResult).toEqual({});
      expect(objectResultWithDefaultValue).toEqual({});
    });
    test('It returns correct value when configuration file exists', () => {
      const defaultValue = 'DEFAULT_VALUE';
      const defaultValueResult1 = config(`${validConfigurationFile}.xx.yy`, defaultValue);
      const defaultValueResult2 = config(`${validConfigurationFile}.aa.yy`, defaultValue);
      const undefinedResult1 = config(`${validConfigurationFile}.key`);
      const undefinedResult2 = config(`${validConfigurationFile}.xx`);
      const result1 = config(`${validConfigurationFile}.aa`);
      const result2 = config(`${validConfigurationFile}.aa.bb`);
      const resultWithDefaultValue1 = config(`${validConfigurationFile}.aa`, defaultValue);
      const resultWithDefaultValue2 = config(`${validConfigurationFile}.aa.bb`, defaultValue);

      const result = {
        bb: {
          cc: true,
            dd: 1
        }
      };

      expect(defaultValueResult1).toEqual(defaultValue);
      expect(defaultValueResult2).toEqual(defaultValue);
      expect(undefinedResult1).toBeUndefined();
      expect(undefinedResult2).toBeUndefined();
      expect(result1).toEqual(result);
      expect(result2).toEqual(result.bb);
      expect(resultWithDefaultValue1).toEqual(result);
      expect(resultWithDefaultValue2).toEqual(result.bb);
    });
  });
});
