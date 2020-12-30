import { Application } from './application';
import { Request, RequestAttributes } from './request';
export declare type ActionHandler = (request: Request) => any;
export declare type Action = {
    request?: new (attributes: RequestAttributes) => Request;
    handler: ActionHandler;
};
export declare abstract class BaseService {
    protected $app: Application;
    constructor($app: Application);
    abstract name(): string;
    abstract version(): number;
    abstract actions(): Record<string, Action | ActionHandler>;
    protected emit(event: string, data: any): Promise<void>;
}
