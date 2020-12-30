import {BaseLogger, LEVEL} from './base';

export class ConsoleLogger extends BaseLogger {
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
  private log(level: LEVEL, ...args: any[]): void {
    if (!this.isValidLevel(level)) {
      return;
    }
    switch(level) {
      case 'fatal':
      case 'error': return console.error(...args);
      case 'warn': return console.warn(...args);
      default: return console.log(...args);
    }
  }
  private isValidLevel(level: LEVEL): boolean {
    //TODO Check if some levels include some others
    return this.$level === 'all' || this.$level === level;
  }
}