import {
  Request
} from '../../src';
import {NextCallback, Pipeline} from '../../src/pipeline';

const unauthorizedError = new Error('Unauthorized');
const createPipeline = (params: any) => {
  return new Pipeline(
    new Request({ params }),
    [
      //auth
      (request: Request, response: any, next: NextCallback) => {
        if (request.get('a') === 1) {
          return next(response);
        }
        throw unauthorizedError;
      },
      //duplicate
      (request: Request, response: any, next: NextCallback) => {
        return next(request.get('a', 2) * 2);
      },
    ]
  );
};

describe('Class Pipeline', () => {
  describe('Execute middleware', () => {
    test('It returns result', async () => {
      const response = await createPipeline({a: 1}).run();
      expect(response).toEqual(2);
    });
    test('It throws Unauthorized error', async () => {
      let error;
      try {
        await createPipeline({a: 2}).run()
      } catch (e) {
        error = e;
      }
      expect(error).toBe(unauthorizedError);
    });
  });
});
