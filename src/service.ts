import { Application } from './application';
import { Request, RequestAttributes } from './request';

export type ActionHandler = (request: Request) => any;

export type Action = {
  request?: new (attributes: RequestAttributes) => Request;
  handler: ActionHandler;
};

export abstract class BaseService {
  public constructor(
    protected $app: Application
  ) {}

  public abstract name(): string;
  public abstract version(): number;
  public abstract actions(): Record<string, Action | ActionHandler>;

  protected emit(event: string, data: any): Promise<void> {
    return this.$app.emit(event, data);
  }
}