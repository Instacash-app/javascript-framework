export declare type RequestAttributes = {
    user?: any;
    params?: Record<string, any>;
    meta?: Record<string, any>;
};
export declare type ValidationRules = Record<string, string>;
export declare type SanitizationRules = Record<string, string>;
export declare type Errors = {
    [field: string]: string[];
};
export declare class Request {
    protected $validationRules: ValidationRules;
    protected $sanitizationRules: SanitizationRules;
    private $attributes;
    private $errors;
    constructor(attributes?: RequestAttributes);
    validate(): Promise<void>;
    hasErrors(): boolean;
    errors(): Errors;
    withParams(params: Record<string, any>): this;
    params(): Record<string, any>;
    get(key: string, defaultValue: any): any;
    private setParsedErrors;
}
