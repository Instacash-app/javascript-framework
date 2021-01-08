import { Request } from './request';
export declare type NextCallback = (response: any) => Promise<any>;
export declare type MiddlewareHandler = (request: Request, response: any, next: NextCallback) => Promise<any>;
export declare class Pipeline {
    protected $input: Request;
    protected $middleware: MiddlewareHandler[];
    constructor($input: Request, $middleware: MiddlewareHandler[]);
    run(): any;
    private execute;
}
