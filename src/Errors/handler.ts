import {Application} from '../application';
import {BaseError} from "./baseError";

export class ErrorHandler {
  public constructor(
    protected $app: Application
  ) {}

  public async handle(error: Error) {
    if (this.shouldReport(error)) {
      await this.report(error);
    }
  }

  protected async report(error: Error): Promise<void> {
    return Promise.resolve();
  }

  protected shouldReport(error: Error) {
    if (error instanceof BaseError) {
      return error.isReportable();
    }

    return true;
  }

}