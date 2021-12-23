import {NotFoundError} from './notFoundError';
import {ValidationError} from './validationError';
import {Application} from '../application';

export type ErrorConstruct = new (...params: any[]) => Error;

export class ErrorHandler {
  public constructor(
    protected $app: Application
  ) {}

  protected $dontReport: ErrorConstruct[] = [
    NotFoundError,
    ValidationError,
  ];

  public async handle(error: Error) {
    if (this.shouldReport(error)) {
      await this.report(error);
    }
  }

  protected async report(error: Error): Promise<void> {
    return Promise.resolve();
  }

  protected shouldReport(error: Error) {
    for (const errorClass of this.$dontReport) {
      if (error instanceof errorClass) {
        return false;
      }
    }

    return true;
  }

}