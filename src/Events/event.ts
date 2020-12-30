import {Application} from '../application';
import {Notifier} from './notifier';

export type NotifierConstructor = new (app: Application) => Notifier;

export abstract class Event {
  private $notifiers: Notifier[] = [];
  constructor(
    private $app: Application
  ) {
    for (const notifier of this.notifiers()) {
      this.$notifiers.push(new notifier($app));
    }
  }

  public async notify(data: any): Promise<void> {
    const ps: Promise<void>[] = [];
    for (const notifier of this.$notifiers) {
      ps.push(notifier.handle(data));
    }
    await Promise.all(ps);
  }

  public abstract notifiers(): NotifierConstructor[];
}
