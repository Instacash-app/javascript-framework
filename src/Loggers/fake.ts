import { BaseLogger } from './base';

export class FakeLogger extends BaseLogger {
  public fatal(...args: any[]): void {
    this.log('fatal', ...args);
  }
  public error(...args: any[]): void {
    this.log('error', ...args);
  }
  public warn(...args: any[]): void {
    this.log('warn', ...args);
  }
  public info(...args: any[]): void {
    this.log('info', ...args);
  }
  public debug(...args: any[]): void {
    this.log('debug', ...args);
  }
  public trace(...args: any[]): void {
    this.log('trace', ...args);
  }
  private log(level: string, ...args: any[]): void {
    //Do nothing
  }
}