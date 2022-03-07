import { BaseError } from './baseError';
declare type ValidationErrorMessages = {
    [field: string]: string[];
};
export declare class ValidationError extends BaseError {
    name: string;
    code: number;
    errorMessages: ValidationErrorMessages;
    constructor(message: string, errorMessages: ValidationErrorMessages);
    key(): string;
    info(): Record<string, any>;
}
export {};
