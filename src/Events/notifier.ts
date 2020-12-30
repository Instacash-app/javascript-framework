import {Application} from '../application';

export abstract class Notifier {
  constructor(
    protected $app: Application
  ) {}

  public abstract handle(data: any): Promise<any>;
}
