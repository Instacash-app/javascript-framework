import { BaseError } from './baseError';
export declare class LogicalError extends BaseError {
    name: string;
    code: number;
    constructor(message: string);
    key(): string;
}
