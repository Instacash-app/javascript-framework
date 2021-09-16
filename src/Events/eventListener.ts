import {Application} from '../application';

export abstract class EventListener {
  protected constructor(
    protected $app: Application
  ) {}

  public abstract handle(data: any): Promise<any>;
}
