import { BaseError } from './baseError';

export class LogicalError extends BaseError {
  public name = 'LogicalError';
  public code = 400;
  constructor(message: string) {
    super(message);
  }

  public key(): string {
    return 'logical';
  }
}