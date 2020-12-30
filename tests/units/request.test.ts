import {
  Request,
  ValidationRules,
  SanitizationRules
} from '../../src';

class RequestTest extends Request {
  protected $validationRules: ValidationRules = {
    username: 'required|alpha',
    email: 'required|email',
  };
  protected $sanitizationRules: SanitizationRules = {
    username: 'trim',
    email: 'normalize_email',
  };
}

describe('Class Request', () => {
  describe('Validating params', () => {
    test('It does not have errors and params are sanitized', async () => {
      const request = new RequestTest().withParams({
        username: 'test',
        email: 'email@email.com'
      });

      await request.validate();
      expect(request.hasErrors()).toBeFalsy();
      expect(request.errors()).toEqual({});
    });
    test('It has errors and params are sanitized', async () => {
      const request = new RequestTest().withParams({
        username: '11test   ',
        email: 'email@emailcom'
      });

      await request.validate();
      expect(request.hasErrors()).toBeTruthy();
      expect(request.errors()).toEqual({
        username: ['alpha validation failed on username']
      });
      expect(request.params()).toEqual({
        username: '11test',
        email: 'email@emailcom'
      });
    });
  });
});
