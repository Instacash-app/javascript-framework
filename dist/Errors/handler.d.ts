import { Application } from '../application';
export declare class ErrorHandler {
    protected $app: Application;
    constructor($app: Application);
    handle(error: Error): Promise<void>;
    protected report(error: Error): Promise<void>;
    protected shouldReport(error: Error): Promise<boolean>;
    protected errorKey(error: Error): string;
}
