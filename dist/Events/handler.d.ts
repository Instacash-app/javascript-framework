import { Event } from './event';
export declare class EventHandler {
    private $events;
    register(eventName: string, event: Event): void;
    notify(eventName: string, data: any): Promise<void>;
}
