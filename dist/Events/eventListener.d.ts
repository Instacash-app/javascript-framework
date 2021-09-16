import { Application } from '../application';
export declare abstract class EventListener {
    protected $app: Application;
    protected constructor($app: Application);
    abstract handle(data: any): Promise<any>;
}
