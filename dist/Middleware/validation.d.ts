import { NextCallback } from '../pipeline';
import { Request } from '../request';
import { BaseMiddleware } from './base';
export declare class ValidationMiddleware extends BaseMiddleware {
    handle(request: Request, response: any, next: NextCallback): Promise<any>;
}
