import {Application} from '../application';
import {BaseError} from "./baseError";

export class ErrorHandler {
  public constructor(
    protected $app: Application
  ) {}

  public async handle(error: Error) {
    const shouldReport = await this.shouldReport(error);
    if (shouldReport) {
      await this.report(error);
    }
  }

  protected async report(error: Error): Promise<void> {
    return Promise.resolve();
  }

  protected shouldReport(error: Error): Promise<boolean> {
    return Promise.resolve(true);
  }

  protected errorKey(error: Error) {
    let prefix = 'unexpected'
    if (error instanceof BaseError) {
      prefix = error.key();
    }

    return `${prefix}.${error.message}`;
  }
}