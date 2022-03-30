import {Application} from '../application';
import {EventListener} from './eventListener';

export type EventListenerConstructor = new (app: Application) => EventListener;

export abstract class Event {
  private $listeners: EventListener[] = [];

  public constructor(
    private $app: Application
  ) {
    for (const listener of this.listeners()) {
      this.$listeners.push(new listener($app));
    }
  }

  public async execute(data: any): Promise<void> {
    const ps: Promise<void>[] = [];
    for (const listener of this.$listeners) {
      ps.push(listener.handle(data));
    }
    await Promise.all(ps);
  }

  public abstract listeners(): EventListenerConstructor[];
}
