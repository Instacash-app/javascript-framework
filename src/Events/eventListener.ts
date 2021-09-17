import {Application} from '../application';

export abstract class EventListener {
  public constructor(
    protected $app: Application
  ) {}

  public abstract handle(data: any): Promise<any>;
}
