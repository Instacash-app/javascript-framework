import {Event} from './event';
import {BaseError} from '../Errors/baseError';

type EventList = Record<string, Event>;

export class EventHandler {
  private $events: EventList = {};

  public register(eventName: string, event: Event) {
    this.$events[eventName] = event;
  }

  public notify(eventName: string, data: any): Promise<void> {
    const event: Event = this.$events[eventName];
    if (!event) {
      throw new BaseError(`Event ('${eventName}') is not registered`);
    }

    return event.notify(data);
  }
}