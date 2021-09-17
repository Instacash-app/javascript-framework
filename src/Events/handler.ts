import {Event} from './event';
import {BaseError} from '../Errors';

type EventList = Record<string, Event>;

export interface EventHandlerContract {
  register(eventName: string, event: Event): void,
  dispatch(eventName: string, data: any): Promise<void>,
  localDispatch(eventName: string, data: any): Promise<void>,
}

export class EventHandler implements EventHandlerContract {
  protected $events: EventList = {};

  public register(eventName: string, event: Event) {
    this.$events[eventName] = event;
  }

  public dispatch(eventName: string, data: any): Promise<void> {
    return this.localDispatch(eventName, data);
  }

  public localDispatch(eventName: string, data: any): Promise<void> {
    return this.event(eventName)
      .dispatch(data);
  }

  protected event(eventName: string) {
    const event: Event = this.$events[eventName];
    if (!event) {
      throw new BaseError(`Event ('${eventName}') is not registered`);
    }

    return event;
  }
}