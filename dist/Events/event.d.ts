import { Application } from '../application';
import { EventListener } from './eventListener';
export declare type EventListenerConstructor = new (app: Application) => EventListener;
export declare abstract class Event {
    private $app;
    private $listeners;
    constructor($app: Application);
    execute(data: any): Promise<void>;
    abstract listeners(): EventListenerConstructor[];
}
