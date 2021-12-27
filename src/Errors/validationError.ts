import { BaseError } from './baseError';

type ValidationErrorMessages = {
  [field: string]: string[]
};

export class ValidationError extends BaseError {
  public name = 'ValidationError';
  public code = 422;
  public errorMessages: ValidationErrorMessages = {};
  constructor(message: string, errorMessages: ValidationErrorMessages) {
    super(message);
    this.errorMessages = errorMessages;
  }

  public isReportable(): boolean {
    return false;
  }

  public info(): Record<string, any> {
    const info = super.info();
    info.detail = this.errorMessages;

    return info;
  }
}