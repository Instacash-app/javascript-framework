import { Event } from './event';
declare type EventList = Record<string, Event>;
export interface EventHandlerContract {
    register(eventName: string, event: Event): void;
    queue(eventName: string, data: any): Promise<void>;
    emit(eventName: string, data: any): Promise<void>;
    execute(eventName: string, data: any): Promise<void>;
}
export declare class EventHandler implements EventHandlerContract {
    protected $events: EventList;
    register(eventName: string, event: Event): void;
    emit(eventName: string, data: any): Promise<void>;
    queue(eventName: string, data: any): Promise<void>;
    execute(eventName: string, data: any): Promise<void>;
    protected event(eventName: string): Event;
}
export {};
