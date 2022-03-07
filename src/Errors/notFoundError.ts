import { BaseError } from './baseError';

export class NotFoundError extends BaseError {
  public name = 'NotFoundError';
  public code = 404;
  constructor(message: string) {
    super(message);
  }

  public key(): string {
    return 'not-found';
  }
}