import { Application } from './application';
export declare abstract class BaseServiceProvider {
    protected $app: Application;
    constructor($app: Application);
    abstract run(): Promise<void>;
}
