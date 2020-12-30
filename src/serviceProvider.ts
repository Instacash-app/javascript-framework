import { Application } from './application';

export abstract class BaseServiceProvider {
  public constructor(
    protected $app: Application
  ) {}

  public abstract run(): Promise<void>;
}