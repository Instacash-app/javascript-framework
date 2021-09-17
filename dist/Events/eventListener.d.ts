import { Application } from '../application';
export declare abstract class EventListener {
    protected $app: Application;
    constructor($app: Application);
    abstract handle(data: any): Promise<any>;
}
