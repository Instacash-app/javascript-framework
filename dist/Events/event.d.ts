import { Application } from '../application';
import { Notifier } from './notifier';
export declare type NotifierConstructor = new (app: Application) => Notifier;
export declare abstract class Event {
    private $app;
    private $notifiers;
    constructor($app: Application);
    notify(data: any): Promise<void>;
    abstract notifiers(): NotifierConstructor[];
}
