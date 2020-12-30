import { BaseLogger } from './base';
export declare class ConsoleLogger extends BaseLogger {
    fatal(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    trace(...args: any[]): void;
    private log;
    private isValidLevel;
}
