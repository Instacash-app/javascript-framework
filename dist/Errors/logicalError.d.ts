import { BaseError } from './baseError';
export declare class LogicalError extends BaseError {
    name: string;
    code: number;
    isReportable(): boolean;
    constructor(message: string);
}
