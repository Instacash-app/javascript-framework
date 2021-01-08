import { Application } from '../application';
import { MiddlewareHandler, NextCallback } from '../pipeline';
import { Request } from '../request';
interface Middleware {
    handle: MiddlewareHandler;
}
export declare abstract class BaseMiddleware implements Middleware {
    protected $app: Application;
    constructor($app: Application);
    abstract handle(request: Request, response: any, next: NextCallback): Promise<any>;
}
export {};
