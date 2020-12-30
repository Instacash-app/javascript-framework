import { Application } from '../application';
export declare abstract class Notifier {
    protected $app: Application;
    constructor($app: Application);
    abstract handle(data: any): Promise<any>;
}
