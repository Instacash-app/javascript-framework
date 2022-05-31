import { Event } from './event';
import { BaseError } from '../Errors';

type EventList = Record<string, Event>;

export type EventOptions = {
  delaySeconds?: number
}
export interface EventHandlerContract {
  register(eventName: string, event: Event): void,
  queue(eventName: string, data: any, eventOptions?: EventOptions): Promise<void>,
  emit(eventName: string, data: any): Promise<void>,
  execute(eventName: string, data: any): Promise<void>,
}


export class EventHandler implements EventHandlerContract {
  protected $events: EventList = {};

  public register(eventName: string, event: Event) {
    this.$events[eventName] = event;
  }

  public emit(eventName: string, data: any): Promise<void> {
    return this.execute(eventName, data);
  }

  public queue(eventName: string, data: any, eventOptions?: EventOptions): Promise<void> {
    return this.execute(eventName, data);
  }

  public execute(eventName: string, data: any): Promise<void> {
    return this.event(eventName)
      .execute(data);
  }

  protected event(eventName: string) {
    const event: Event = this.$events[eventName];
    if (!event) {
      throw new BaseError(`Event ('${eventName}') is not registered`);
    }

    return event;
  }
}