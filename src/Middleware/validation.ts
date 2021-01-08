import {NextCallback} from '../pipeline';
import {Request} from '../request';
import {BaseMiddleware} from './base';
import {ValidationError} from '../Errors';

export class ValidationMiddleware extends BaseMiddleware {
  public async handle(request: Request, response: any, next: NextCallback): Promise<any> {
    await request.validate();
    if (request.hasErrors()) {
      throw new ValidationError('Validation error', request.errors())
    }

    return next(response);
  }
}