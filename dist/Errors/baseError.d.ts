export declare class BaseError extends Error {
    name: string;
    code: number;
    constructor(message: string);
    isReportable(): boolean;
    info(): Record<string, any>;
}
