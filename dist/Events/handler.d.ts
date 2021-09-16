import { Event } from './event';
export interface EventHandlerContract {
    register(eventName: string, event: Event): void;
    dispatch(eventName: string, data: any): Promise<void>;
    localDispatch(eventName: string, data: any): Promise<void>;
}
export declare class EventHandler implements EventHandlerContract {
    private $events;
    register(eventName: string, event: Event): void;
    dispatch(eventName: string, data: any): Promise<void>;
    localDispatch(eventName: string, data: any): Promise<void>;
}
