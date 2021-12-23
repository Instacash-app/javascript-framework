import { Application } from '../application';
export declare type ErrorConstruct = new (...params: any[]) => Error;
export declare class ErrorHandler {
    protected $app: Application;
    constructor($app: Application);
    protected $dontReport: ErrorConstruct[];
    handle(error: Error): Promise<void>;
    protected report(error: Error): Promise<void>;
    protected shouldReport(error: Error): boolean;
}
