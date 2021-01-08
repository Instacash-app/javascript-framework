import {Request} from './request';

export type NextCallback = (response: any) => Promise<any>;
export type MiddlewareHandler = (request: Request, response: any, next: NextCallback) => Promise<any>;

export class Pipeline {
  public constructor(
    protected $input: Request,
    protected $middleware: MiddlewareHandler[]
  ) {
  }

  public run() {
    return this.execute(0);
  }

  private execute(index: number, response?: any): any {
    const currentMiddleware = this.$middleware[index];
    if (!currentMiddleware) {
      return Promise.resolve(response);
    }

    return currentMiddleware(this.$input, response, (responseParam: any) => {
      return this.execute(++ index, responseParam);
    });
  }
}