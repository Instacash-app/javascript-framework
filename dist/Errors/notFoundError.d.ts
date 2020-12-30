import { BaseError } from './baseError';
export declare class NotFoundError extends BaseError {
    name: string;
    code: number;
    constructor(message: string);
}
