import { BaseError } from './baseError';

export class LogicalError extends BaseError {
  public name = 'LogicalError';
  public code = 400;
  public isReportable(): boolean {
    return false;
  }
  constructor(message: string) {
    super(message);
  }
}