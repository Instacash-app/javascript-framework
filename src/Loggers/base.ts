import { Application } from '../application';

export type LEVEL = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'all';

export interface Logger {
  fatal(...args: any[]): void;
  error(...args: any[]): void;
  warn(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
  trace(...args: any[]): void;
}

export abstract class BaseLogger implements Logger {
  public constructor(
    protected $app: Application,
    protected $level: LEVEL
  ) {
  }

  public abstract fatal(...args: any[]): void;
  public abstract error(...args: any[]): void;
  public abstract warn(...args: any[]): void;
  public abstract info(...args: any[]): void;
  public abstract debug(...args: any[]): void;
  public abstract trace(...args: any[]): void;
}