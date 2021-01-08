import { Application } from '../application';
import {MiddlewareHandler, NextCallback} from '../pipeline';
import { Request } from '../request';

interface Middleware {
  handle: MiddlewareHandler
}

export abstract class BaseMiddleware implements Middleware{
  public constructor(
    protected $app: Application
  ) {}

  public abstract handle(request: Request, response: any, next: NextCallback): Promise<any>;
}