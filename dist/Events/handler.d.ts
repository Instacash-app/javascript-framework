import { Event } from './event';
declare type EventList = Record<string, Event>;
export interface EventHandlerContract {
    register(eventName: string, event: Event): void;
    dispatch(eventName: string, data: any): Promise<void>;
    localDispatch(eventName: string, data: any): Promise<void>;
}
export declare class EventHandler implements EventHandlerContract {
    protected $events: EventList;
    register(eventName: string, event: Event): void;
    dispatch(eventName: string, data: any): Promise<void>;
    localDispatch(eventName: string, data: any): Promise<void>;
    protected event(eventName: string): Event;
}
export {};
