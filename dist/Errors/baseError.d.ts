export declare class BaseError extends Error {
    name: string;
    code: number;
    constructor(message: string);
    key(): string;
    info(): Record<string, any>;
}
